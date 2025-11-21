import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function RiderApp(){
  const [loc, setLoc] = useState(null)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!navigator.geolocation) return
    const watch = navigator.geolocation.watchPosition((p) => {
      setLoc({ lon: p.coords.longitude, lat: p.coords.latitude, speed: p.coords.speed || 0, heading: p.coords.heading || 0 })
    })
    return () => navigator.geolocation.clearWatch(watch)
  }, [])

  const share = async () => {
    if (!loc) return
    setStatus('sending...')
    await fetch(`${API}/api/rider/location`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rider_id: 'demo-rider', order_id: null, ...loc }) })
    setStatus('sent')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Rider App</h1>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="text-sm text-slate-400 mb-2">Live Location</div>
          <pre className="text-xs bg-slate-800/60 p-3 rounded">{JSON.stringify(loc, null, 2) || 'Waiting for GPS...'}</pre>
          <button onClick={share} className="mt-3 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold">Share Location</button>
          <div className="text-sm text-slate-400 mt-2">{status}</div>
        </div>
      </div>
    </div>
  )
}
