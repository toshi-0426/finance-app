'use client'

import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, TransactionCategory, TransactionType, types } from "@/lib/consts";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  type: TransactionType,
  category: TransactionCategory,
  created_at: string
  date: string,
  amount: number,
  description: string
}

export default function TransactionForm() {
    const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (<>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label className="mb-1">Type</Label>
                    <Select defaultValue="" {...register("type")}>
                        <option value="" disabled hidden>Select</option>
                        {types.map(type => <option key={type}>{type}</option>)}
                    </Select>
                </div>

                <div>
                    <Label className="mb-1">Category</Label>
                    <Select defaultValue="" {...register("category")}>
                        <option value="" disabled hidden>Select</option>
                        {categories.map(category => <option key={category}>{category}</option>)}
                    </Select>
                </div>

                <div>
                    <Label className="mb-1">Date</Label>
                    <Input {...register("created_at")} placeholder="YYYY-MM-DD"/>
                </div>

                <div>
                    <Label className="mb-1">Amount</Label>
                    <Input type="number" {...register("amount")}/>
                </div>

                <div className="cols-pan-2">
                    <Label className="mb-1">Description</Label>
                    <Input {...register("description")}/>
                </div>
            </div>
            
            <div className="flex items-center space-x-4 justify-end">
                <div className="">
                    <Button type="submit">Save</Button>
                </div>
                <div className="">
                    <Button onClick={() => reset()} variant="ghost" className="border">Reset</Button>
                </div>
            </div>
            
        </form>
    </>
    );
}