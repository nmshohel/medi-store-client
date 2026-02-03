import { getMedicine } from "@/actions/medicine.action";
import MedicineTable from "@/components/modules/seller/MedicineTable";
import { Table } from "@/components/ui/table";
import { medicineService } from "@/services/medicine.service";

export default async function SellerDashboard() {
  const response = await getMedicine();
  const medicineData = response.data?.data || [];
  return (
    <div>
      <h1>Medicine Data</h1>
      <MedicineTable medicineData={medicineData} />
    </div>
  );
}
