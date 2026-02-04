import { getCategoriess } from "@/actions/category.action";
import CategoryTable from "@/components/modules/admin/category/CategoryTable";
import React from "react";

export default async function AdminCategoryPage() {
  const response = await getCategoriess();
  const categoryData = response.data || [];

  return (
    <div>
      AdminCategoryPage
      <CategoryTable categoryData={categoryData} />
    </div>
  );
}
