import PageHeader from "@/components/app-header";
import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import Trend from "@/components/trend";
import Separator from '@/components/separator'
import Skelton from "@/components/skelton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground"   
};

export default function Page(){
    return (
        <main className="space-y-20 mb-44">
            <h1 className="text-4xl mt-8">Playground</h1>

            <div>
                <h2 className="mb-4 text-lg font-mono">Page Header</h2>
                <Separator />
                <div><PageHeader /></div>
            </div>

            <div>
                <h2 className="mb-4 text-lg font-mono">Trend</h2>
                <Separator />
                <div className="flex space-x-12">
                    <Trend type="Income" amount={1000} prevAmount={900} />
                    <Trend type="Expense" amount={12000} prevAmount={10000} />
                    <Trend type="Investment" amount={7000} prevAmount={11100} />
                    <Trend type="Saving" amount={500} prevAmount={950} />
                </div>
            </div>
            
            <div>
                <h2 className="mb-4 text-lg font-mono">Tansaction Item</h2>
                <Separator />
                <div className="">
                    <TransactionItem type="Income" description="Salary" amount={2000} />
                    <TransactionItem type="Expense" category="Food" description="Going out to eat" amount={29} />
                    <TransactionItem type="Investment" description="In Microsoft" amount={500} />
                    <TransactionItem type="Saving" description="For children" amount={2000} />
                    
                </div>
            </div>

            <div>
                <h2 className="mb-4 text-lg font-mono">Tansaction Summary Item + Transaction Item</h2>
                <Separator />
                <div className="space-y-4">
                    <TransactionSummaryItem date={new Date(2025, 5, 4)} amount={3500}/>
                    <hr className="mb-4 border-gray-400 dark:border-gray-800"/>
                    <TransactionItem type="Income" description="Salary" amount={2000} />
                    <TransactionItem type="Expense" category="Food" description="Going out to eat" amount={29} />
                    <TransactionItem type="Investment" description="In Microsoft" amount={500} />
                    <TransactionItem type="Saving" description="For children" amount={2000} />
                </div>
            </div>


            <div>
                <h2 className="mb-4 text-lg font-mono">Buttons</h2>
                <Separator />
                <div className="space-x-4">
                    <Button>Hello</Button>
                    <Button variant="outline">Hello</Button>
                    <Button variant="ghost">Hello</Button>   

                    <Button size="xs">Hello</Button>
                    <Button size="sm">Hello</Button>
                    <Button size="lg">Hello</Button>            
                </div>
            </div>


            <div>
                <h2 className="mb-4 text-lg font-mono">Forms</h2>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label className="block mb-1">Your Name</Label>
                        <Input type="text" placeholder="Type something in here ..."/>
                    </div>

                    <div>
                        <Label className="block mb-1">City</Label>
                        <Select>
                            <option>London</option>
                            <option>Berlin</option>
                            <option>Paris</option>
                            <option>Madrid</option>
                        </Select>
                    </div>

                    <div className="flex items-center">
                        <Input type="checkbox" id="terms" />
                        <Label className="ml-2" htmlFor="terms">Accept terms</Label> 
                    </div>
                </div>
            </div>


            <div>
                <h2 className="mb-4 text-lg font-mono">Loading Skelton</h2>
                <Separator />
                <div className="space-y-8">
                    <div className="flex space-x-4">
                        <Skelton />
                        <Skelton />
                        <Skelton />
                    </div>   

                    <div className="space-y-4">
                        <Skelton />
                        <Skelton />
                        <Skelton />      
                    </div>
                </div>
            </div>
            

        </main>
    )
}