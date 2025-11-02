export async function hitungLuasPersegi(sisi: number) {
    const res = await fetch('/api/luas-persegi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sisi }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
}

export async function hitungLuasKubus(sisi: number) {
    const res = await fetch('/api/luas-kubus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sisi }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
}
