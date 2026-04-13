import type { ProductRecord, ProductMetrics } from "@/types/api";
import { bi, rand, randInt } from "./helpers";

export const mockProducts: ProductRecord[] = [
  {
    sku: "SKU001",
    name: bi("Brightening Serum", "亮肤精华液"),
    category: bi("Serum", "精华"),
    price: 199,
    lifecycle: bi("Growth", "成长期"),
    sellingPoints: bi(
      "Niacinamide + Vitamin C dual brightening, lightweight water texture, visible results in 28 days.",
      "烟酰胺+维C双重亮肤，轻薄水感质地，28天可见效果。"
    ),
    competitors: bi("OLAY Small White Bottle, Proya Essence", "OLAY 小白瓶、珀莱雅精华"),
    launchDate: "2024-06-15",
    monthlySales: 12400,
  },
  {
    sku: "SKU002",
    name: bi("Repair Cream", "修护面霜"),
    category: bi("Cream", "面霜"),
    price: 259,
    lifecycle: bi("Mature", "成熟期"),
    sellingPoints: bi(
      "Ceramide barrier repair, suitable for sensitive skin, dermatologist tested.",
      "神经酰胺屏障修护，敏感肌适用，皮肤科医生测试。"
    ),
    competitors: bi("Winona Barrier Cream, Kiehl's Ultra Facial Cream", "薇诺娜屏障霜、科颜氏面霜"),
    launchDate: "2024-01-10",
    monthlySales: 8900,
  },
  {
    sku: "SKU003",
    name: bi("Lightweight Sunscreen Milk", "轻薄防晒乳"),
    category: bi("Sunscreen", "防晒"),
    price: 139,
    lifecycle: bi("Launch", "上市期"),
    sellingPoints: bi(
      "SPF50+ PA++++, lightweight non-greasy, no white cast, suitable under makeup.",
      "SPF50+ PA++++，轻薄不油腻，不假白，适合妆前使用。"
    ),
    competitors: bi("Anessa, Biore UV", "安耐晒、碧柔防晒"),
    launchDate: "2025-02-20",
    monthlySales: 3200,
  },
  {
    sku: "SKU004",
    name: bi("Amino Acid Facial Cleanser", "氨基酸洁面乳"),
    category: bi("Cleanser", "洁面"),
    price: 89,
    lifecycle: bi("Mature", "成熟期"),
    sellingPoints: bi(
      "Amino acid surfactant, pH 5.5, gentle cleansing without stripping.",
      "氨基酸表活，pH 5.5，温和洁净不紧绷。"
    ),
    competitors: bi("Freeplus, Cerave Cleanser", "芙丽芳丝、适乐肤洁面"),
    launchDate: "2023-09-01",
    monthlySales: 15600,
  },
  {
    sku: "SKU005",
    name: bi("Hyaluronic Acid Toner", "玻尿酸爽肤水"),
    category: bi("Toner", "化妆水"),
    price: 119,
    lifecycle: bi("Growth", "成长期"),
    sellingPoints: bi(
      "Triple hyaluronic acid hydration, alcohol-free, prep skin for better absorption.",
      "三重玻尿酸保湿，无酒精，为后续护肤打底。"
    ),
    competitors: bi("Hada Labo Lotion, Laneige Toner", "肌研极润、兰芝化妆水"),
    launchDate: "2024-08-01",
    monthlySales: 9800,
  },
  {
    sku: "SKU006",
    name: bi("Retinol Night Cream", "视黄醇晚霜"),
    category: bi("Cream", "面霜"),
    price: 289,
    lifecycle: bi("Launch", "上市期"),
    sellingPoints: bi(
      "Encapsulated retinol 0.3%, anti-aging + firming, paired with soothing complex to reduce irritation.",
      "包裹型视黄醇0.3%，抗老+紧致，搭配舒缓复合物降低刺激。"
    ),
    competitors: bi("La Roche-Posay Retinol B3, Olay Retinol 24", "理肤泉B5、OLAY视黄醇24"),
    launchDate: "2025-03-01",
    monthlySales: 1800,
  },
  {
    sku: "SKU007",
    name: bi("Centella Eye Cream", "积雪草眼霜"),
    category: bi("Eye Care", "眼霜"),
    price: 179,
    lifecycle: bi("Growth", "成长期"),
    sellingPoints: bi(
      "Centella + caffeine formula, reduces dark circles and puffiness, lightweight gel texture.",
      "积雪草+咖啡因配方，淡化黑眼圈和浮肿，轻薄啫喱质地。"
    ),
    competitors: bi("Innisfree Eye Cream, Origins Eye Doctor", "悦诗风吟眼霜、悦木之源眼霜"),
    launchDate: "2024-11-15",
    monthlySales: 5400,
  },
  {
    sku: "SKU008",
    name: bi("Salicylic Acid Spot Gel", "水杨酸祛痘凝胶"),
    category: bi("Treatment", "功效护理"),
    price: 69,
    lifecycle: bi("Mature", "成熟期"),
    sellingPoints: bi(
      "2% salicylic acid, targeted acne treatment, dries clear, non-drying formula.",
      "2%水杨酸，针对痘痘局部护理，透明速干，不干燥配方。"
    ),
    competitors: bi("Mario Badescu Drying Lotion, COSRX Pimple Patch", "Mario Badescu祛痘水、COSRX痘痘贴"),
    launchDate: "2024-03-20",
    monthlySales: 11200,
  },
  {
    sku: "SKU009",
    name: bi("Vitamin E Body Lotion", "维E身体乳"),
    category: bi("Body Care", "身体护理"),
    price: 79,
    lifecycle: bi("Mature", "成熟期"),
    sellingPoints: bi(
      "400ml large bottle, vitamin E + shea butter, deep moisturizing for dry skin, light fragrance.",
      "400ml大瓶装，维E+乳木果油，深层滋润干燥肌肤，淡雅香气。"
    ),
    competitors: bi("Vaseline Body Lotion, Nivea Body Milk", "凡士林身体乳、妮维雅身体乳"),
    launchDate: "2023-11-01",
    monthlySales: 18500,
  },
  {
    sku: "SKU010",
    name: bi("Makeup Removing Cleansing Oil", "卸妆洁颜油"),
    category: bi("Cleanser", "洁面"),
    price: 129,
    lifecycle: bi("Growth", "成长期"),
    sellingPoints: bi(
      "Plant-based cleansing oil, emulsifies quickly, removes waterproof makeup, no residue.",
      "植物基底卸妆油，快速乳化，卸除防水彩妆，无残留。"
    ),
    competitors: bi("DHC Cleansing Oil, Shu Uemura Cleansing Oil", "DHC卸妆油、植村秀卸妆油"),
    launchDate: "2024-05-10",
    monthlySales: 7300,
  },
];

export function generateProductMetrics(period: { start: string; end: string }): ProductMetrics[] {
  return mockProducts.map((p) => ({
    sku: p.sku,
    name: p.name,
    gmv: randInt(50000, 800000),
    orders: randInt(200, 8000),
    conversionRate: rand(2.5, 8.5),
    refundRate: rand(1.5, 8.0),
    avgOrderValue: rand(p.price * 0.8, p.price * 1.5),
  }));
}
