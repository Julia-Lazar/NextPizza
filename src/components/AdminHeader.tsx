import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="bg-orange-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Panel - Next Pizza</h1>
          <Link
            href="/"
            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Back to Site
          </Link>
        </div>
      </div>
    </header>
  );
}
