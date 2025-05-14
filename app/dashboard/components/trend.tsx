import BaseTrend from '../../../components/trend';

type TrendProps = {
    type: 'Income' | 'Expense' | 'Investment' | 'Saving'
}


export default async function Trend({type}: TrendProps) {
    await new Promise((r) => setTimeout(r, 3000));
    const request: Response = await fetch(`http://localhost:3100/trend/${type}`);
    const {amount, prevAmount} = await request.json();

    return (
        <BaseTrend type={type} amount={amount} prevAmount={prevAmount} />
    );
}