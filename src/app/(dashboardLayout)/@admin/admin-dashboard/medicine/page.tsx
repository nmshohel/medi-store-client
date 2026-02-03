import { getMedicine } from "@/actions/medicine.action";
import AdminMedicineTable from "@/components/modules/admin/AdminMedicineTable";
import React from "react";

export default async function AdminMedicinePage() {
  const response = await getMedicine();
  const medicineData = response.data?.data || [];
  return (
    <div>
      <AdminMedicineTable medicineData={medicineData} />
    </div>
  );
}
