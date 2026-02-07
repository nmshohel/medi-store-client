import AddCategory from "@/components/modules/admin/category/AddCategory";
export const dynamic = "force-dynamic";
export default function AddCategoryPage() {
  return (
    <div className="min-h-screen w-full flex mt-20 justify-center">
      <AddCategory />
    </div>
  );
}
