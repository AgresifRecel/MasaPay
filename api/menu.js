export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.allorigins.win/raw?url=" +
        encodeURIComponent(
          "https://europe-west3-paragastroteka-inventory.cloudfunctions.net/getQrMenu?customerId=sakal-kafe-bar&branchId=sakal-kafe-bar-1"
        )
    );

    const data = await response.json();

    const all = [];

    data.categories.forEach((cat) => {
      (cat.sections || []).forEach((sec) => {
        (sec.products || []).forEach((p) => {
          all.push({
            name: p.name,
            price: p.price,
            category: cat.name
          });
        });
      });
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ error: "menu alınamadı" });
  }
}
