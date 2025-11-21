export default function SellerApp(){
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Orders" subtitle="Accept / Reject / Pack"/>
          <Card title="Inventory" subtitle="Update stock in real-time"/>
          <Card title="Insights" subtitle="Sales & offers"/>
        </div>
      </div>
    </div>
  )
}

function Card({ title, subtitle }){
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-sm text-slate-400">{subtitle}</div>
      <div className="h-28 mt-4 rounded-lg bg-slate-800/60" />
    </div>
  )
}
