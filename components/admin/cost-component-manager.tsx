"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { createBrowserClient } from "@/lib/supabase/client"
import { Plus, Edit, Trash2, DollarSign } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CostComponent {
  id: string
  component_name: string
  category: string
  unit_cost: number
  unit: string
  description: string
  supplier: string
  created_at: string
}

export function CostComponentManager() {
  const [costComponents, setCostComponents] = useState<CostComponent[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<CostComponent | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const supabase = createBrowserClient()

  useEffect(() => {
    fetchCostComponents()
  }, [])

  const fetchCostComponents = async () => {
    try {
      const { data, error } = await supabase
        .from("cost_components")
        .select("*")
        .order("category", { ascending: true })
        .order("component_name", { ascending: true })

      if (error) throw error
      setCostComponents(data || [])
    } catch (error) {
      console.error("Error fetching cost components:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    const data = {
      component_name: formData.get("component_name") as string,
      category: formData.get("category") as string,
      unit_cost: Number.parseFloat(formData.get("unit_cost") as string),
      unit: formData.get("unit") as string,
      description: formData.get("description") as string,
      supplier: formData.get("supplier") as string,
    }

    try {
      if (editingItem) {
        const { error } = await supabase.from("cost_components").update(data).eq("id", editingItem.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("cost_components").insert([data])
        if (error) throw error
      }

      setIsDialogOpen(false)
      setEditingItem(null)
      fetchCostComponents()
    } catch (error) {
      console.error("Error saving cost component:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this cost component?")) return

    try {
      const { error } = await supabase.from("cost_components").delete().eq("id", id)

      if (error) throw error
      fetchCostComponents()
    } catch (error) {
      console.error("Error deleting cost component:", error)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "tank":
        return "bg-blue-100 text-blue-800"
      case "pump":
        return "bg-green-100 text-green-800"
      case "filter":
        return "bg-purple-100 text-purple-800"
      case "pipe":
        return "bg-orange-100 text-orange-800"
      case "installation":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  // Group components by category
  const groupedComponents = costComponents.reduce(
    (acc, component) => {
      if (!acc[component.category]) {
        acc[component.category] = []
      }
      acc[component.category].push(component)
      return acc
    },
    {} as Record<string, CostComponent[]>,
  )

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading cost components...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Cost Component Management</h2>
          <p className="text-slate-600 mt-1">Manage pricing for system components and services</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Cost Component
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Cost Component</DialogTitle>
              <DialogDescription>Enter pricing information for system components and services.</DialogDescription>
            </DialogHeader>
            <form action={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="component_name">Component Name</Label>
                  <Input
                    id="component_name"
                    name="component_name"
                    defaultValue={editingItem?.component_name}
                    placeholder="e.g., Polyethylene Tank"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue={editingItem?.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tank">Tank</SelectItem>
                      <SelectItem value="pump">Pump</SelectItem>
                      <SelectItem value="filter">Filter</SelectItem>
                      <SelectItem value="pipe">Pipe</SelectItem>
                      <SelectItem value="installation">Installation</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unit_cost">Unit Cost ($)</Label>
                  <Input
                    id="unit_cost"
                    name="unit_cost"
                    type="number"
                    step="0.01"
                    defaultValue={editingItem?.unit_cost}
                    placeholder="150.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select name="unit" defaultValue={editingItem?.unit}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="each">Each</SelectItem>
                      <SelectItem value="liter">Liter</SelectItem>
                      <SelectItem value="meter">Meter</SelectItem>
                      <SelectItem value="square_meter">Square Meter</SelectItem>
                      <SelectItem value="hour">Hour</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={editingItem?.description}
                  placeholder="Brief description of the component"
                />
              </div>

              <div>
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  name="supplier"
                  defaultValue={editingItem?.supplier}
                  placeholder="Supplier or manufacturer name"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingItem ? "Update" : "Add"} Component</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedComponents).map(([category, components]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 capitalize">
                <DollarSign className="w-5 h-5" />
                {category} Components
                <Badge className={getCategoryColor(category)}>{components.length} items</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {components.map((component) => (
                  <div
                    key={component.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <h4 className="font-medium text-slate-900">{component.component_name}</h4>
                          <p className="text-sm text-slate-600">{component.description}</p>
                          {component.supplier && (
                            <p className="text-xs text-slate-500 mt-1">Supplier: {component.supplier}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-slate-900">${component.unit_cost.toFixed(2)}</p>
                        <p className="text-sm text-slate-600">per {component.unit}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingItem(component)
                            setIsDialogOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(component.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
