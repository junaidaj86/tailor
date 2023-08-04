import prismadb from "@/lib/prismadb";

import { ShirtForm } from "./components/shirt-form";

const ShirtPage = async () => {




  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ShirtForm />
      </div>
    </div>
  );
}

export default ShirtPage;
