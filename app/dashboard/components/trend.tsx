import { createClient } from '@/lib/supabase/server';
import BaseTrend from '../../../components/trend';
import { RangeType } from '@/lib/consts';

type TrendProps = {
    type: 'Income' | 'Expense' | 'Investment' | 'Saving',
    range: RangeType
}


export default async function Trend({type, range}: TrendProps) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .rpc('calculate_total', {
            type_arg: type,
            range_arg: range
        });

    if (error) throw new Error('Could not fetch trend data');
    
    const amounts = data[0];
    
    return (
        <BaseTrend type={type} 
                   amount={amounts.current_amount} 
                   prevAmount={amounts.previous_amount} 
        />
    );
}