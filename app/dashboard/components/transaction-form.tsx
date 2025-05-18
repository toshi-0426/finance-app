'use client'

import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, types } from "@/lib/consts";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Inputs, TransactionSchema } from "@/lib/validation";
import { createTransaction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { FormError } from "@/components/form-error";
import { useState } from "react";


export default function TransactionForm() {
    const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: zodResolver(TransactionSchema),
    });

    const [isSaving, setIsSaving] = useState(false);
    const [lastError, setLastError] = useState<Error | null>(null);
    const router = useRouter();
    const type = watch('type');

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsSaving(true);
        setLastError(null);
        try {
            await createTransaction(data); 
            router.push('/dashboard');
        } catch(error) {
            setLastError(error as Error);
            //console.error('Submit failed:', error);
        }
        finally {
            setIsSaving(false);
        }
    }

    const onReset = () => {
        reset();
        setIsSaving(false);
    }

    return (<>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label className="mb-1">Type</Label>
                    <Select defaultValue=""  {...register("type", { 
                        required: true,
                        onChange: (e) => {
                            if (e.target.value !== "Expense"){
                                setValue("category", "")
                            }
                        }
                    })}>
                        <option value="" hidden>Select</option>
                        {types.map(type => <option key={type}>{type}</option>)}
                    </Select>
                    <FormError error={errors.type}></FormError>
                </div>

                <div>
                    <Label className="mb-1">Category</Label>
                    <Select defaultValue="" disabled={type !== 'Expense'} {...register("category")}>
                        <option value="" disabled hidden>Select</option>
                        {categories.map(category => <option key={category}>{category}</option>)}
                    </Select>
                    <FormError error={errors.category}></FormError>
                </div>

                <div>
                    <Label className="mb-1">Date</Label>
                    <Input placeholder="YYYY-MM-DD" {...register("created_at")} />
                    <FormError error={errors.created_at}></FormError>
                </div>

                <div>
                    <Label className="mb-1">Amount</Label>
                    <Input type="number" {...register("amount")}/>
                    <FormError error={errors.amount}></FormError>
                </div>

                <div className="col-span-1 md:col-span-2">
                    <Label className="mb-1">Description</Label>
                    <Input {...register("description")}/>
                    <FormError error={errors.description}></FormError>
                </div>
            </div>
            
            <div className="flex items-center space-x-4 justify-between">
                <div>
                    {lastError && <FormError error={lastError} />}
                </div>
                <div className="flex items-center space-x-4 justify-between">
                    <div className="">
                        <Button type="submit" disabled={isSaving}>Save</Button>
                    </div>
                    <div className="">
                        <Button onClick={onReset} variant="ghost" className="border">Reset</Button>
                    </div>
                </div>
            </div>
            
        </form>
    </>
    );
}