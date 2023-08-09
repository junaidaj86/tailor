export interface ShirtFormProps {
    initialCustomerData: Customer | null;
    initialShirtData: Shirt | null;
  }

  export type Customer = {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  
  export type Shirt = {
    id: string;
    length: number;
    neck: number;
    waist: number;
    sleeves: string;
    sleevesLength: number;
    cuff: string;
    cuffSize: number;
    chestSize: number;
    shoulder: number;
    notes: string;
    fit: string;
    collar: string;
    placket: string;
    seat: string;
    pocket: string;
    images: Image[];
    quantity: number;
  };

  type Image = {
    url: string;
  };
  export type Pant = {
    id: string;
    length: number;
    neck: number;
    waist: number;
    sleeves: string;
    sleevesLength: number;
    cuff: string;
    cuffSize: number;
    chestSize: number;
    shoulder: number;
    notes: string;
    fit: string;
    collar: string;
    placket: string;
    seat: string;
    pocket: string;
    images: Image[];
    quantity: number;
  };


  export interface shopProp {
    data: Shirt | Pant;
  }