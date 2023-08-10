import prismadb from "@/lib/prismadb";

import { PantForm } from "./components/pant-form";

const PantPage = async () => {




  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PantForm />
      </div>
    </div>
  );
}

export default PantPage;
