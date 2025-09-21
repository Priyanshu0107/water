import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function LocationsPage() {
  const supabase = createClient();

  // Get current user
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login"); // redirect if not logged in
  }

  // Fetch locations for the user
  const { data: locations, error: locationsError } = await supabase
    .from("locations")
    .select("*")
    .eq("user_id", data.user.id);

  if (locationsError) {
    console.error(locationsError);
    return <div>Error loading locations</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Locations</h1>

      <Link
        href="/locations/new"
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4 inline-block"
      >
        + Add New Location
      </Link>

      {locations && locations.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Address</th>
              <th className="border p-2 text-left">Latitude</th>
              <th className="border p-2 text-left">Longitude</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc: any) => (
              <tr key={loc.id}>
                <td className="border p-2">{loc.name}</td>
                <td className="border p-2">{loc.address}</td>
                <td className="border p-2">{loc.latitude}</td>
                <td className="border p-2">{loc.longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No locations found. Add a new location to get started.</p>
      )}
    </div>
  );
}
