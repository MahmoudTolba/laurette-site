export interface Product {
  id: number
  name: string
  category: string
  price: number
  oldPrice: number | null
  onSale: boolean
  image: string
}

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Topface Instyle Creamy Lipstick 001.', category: 'Makeup', price: 188, oldPrice: 375, onSale: true, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400' },
  { id: 2, name: 'Topface Micellar Cleansing Water 150 ml.', category: 'Skin Care', price: 193, oldPrice: 385, onSale: true, image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400' },
  { id: 3, name: 'Soralone Hydra Cream Gel 100ml Offer (1+1)', category: 'Korean Care', price: 275, oldPrice: 550, onSale: true, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400' },
  { id: 4, name: 'Soralone Cica Cream Gel 60ml Offer (1+1)', category: 'Korean Care', price: 295, oldPrice: 590, onSale: true, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400' },
  { id: 5, name: 'Capixy Intense Tonic Spray Offer (1+1)', category: 'Hair Care', price: 700, oldPrice: 1400, onSale: true, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=400' },
  { id: 6, name: 'Luxury Rose Treatment Facial Oil', category: 'Skin Care', price: 450, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400' },
  { id: 7, name: 'Gentle Baby Moisturizing Lotion 200ml', category: 'Baby Care', price: 220, oldPrice: 280, onSale: true, image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=400' },
  { id: 8, name: 'Nourishing Body Butter Rose Garden', category: 'Body Care', price: 320, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=400' },
  { id: 9, name: 'Seoul Glow Vitamin C Serum', category: 'Korean Care', price: 520, oldPrice: 650, onSale: true, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=400' },
  { id: 10, name: 'Matte Finish Foundation SPF 30', category: 'Makeup', price: 340, oldPrice: null, onSale: false, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400' },
]

export function useProducts() {
  const products = MOCK_PRODUCTS

  const getByCategory = (categoryName: string) =>
    products.filter(p => p.category === categoryName)

  const getBySlug = (slug: string) =>
    getByCategory(slugToCategoryName(slug))

  return { products, getByCategory, getBySlug }
}
