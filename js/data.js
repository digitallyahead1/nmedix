const categories = [
    { id: 'c1', name: 'Pain Relief', icon: '💊' },
    { id: 'c2', name: 'Antibiotics', icon: '🛡️' },
    { id: 'c3', name: 'Vitamins', icon: '🍎' },
    { id: 'c4', name: 'Diabetes', icon: '❤️' },
    { id: 'c5', name: 'Malaria', icon: '🦟' },
    { id: 'c6', name: 'Hypertension', icon: '💓' },
    { id: 'c7', name: 'Pregnancy', icon: '👶' },
    { id: 'c8', name: 'Skincare', icon: '✨' }
];

const medicines = [{
        id: 'm1',
        name: 'Paracetamol 500mg x20',
        category: 'Pain Relief',
        originalPrice: 1500,
        price: 1200,
        rating: 4.8,
        reviews: 128,
        stock: 5,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400&h=400',
        brand: 'Emzor',
        isFlashDeal: true,
        isBestSeller: true
    },
    {
        id: 'm2',
        name: 'Vitamin C 1000mg Effervescent',
        category: 'Vitamins',
        originalPrice: 3500,
        price: 2800,
        rating: 4.5,
        reviews: 84,
        stock: 120,
        image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=400&h=400',
        brand: 'Reload',
        isFlashDeal: true,
        isBestSeller: true
    },
    {
        id: 'm3',
        name: 'Artemether Lumefantrine 80/480',
        category: 'Malaria',
        originalPrice: 2500,
        price: 2500,
        rating: 4.9,
        reviews: 210,
        stock: 45,
        image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=400&h=400',
        brand: 'Lonart',
        isFlashDeal: false,
        isBestSeller: true
    },
    {
        id: 'm4',
        name: 'Amoxicillin 500mg Capsules',
        category: 'Antibiotics',
        originalPrice: 1800,
        price: 1500,
        rating: 4.6,
        reviews: 92,
        stock: 0,
        image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400&h=400',
        brand: 'GSK',
        isFlashDeal: true,
        isBestSeller: false
    },
    {
        id: 'm5',
        name: 'Amlodipine 5mg Tablets',
        category: 'Hypertension',
        originalPrice: 4200,
        price: 4200,
        rating: 4.7,
        reviews: 156,
        stock: 30,
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=400&h=400',
        brand: 'Pfizer',
        isFlashDeal: false,
        isBestSeller: true
    },
    {
        id: 'm6',
        name: 'Metformin 500mg Tablets',
        category: 'Diabetes',
        originalPrice: 3000,
        price: 2700,
        rating: 4.8,
        reviews: 112,
        stock: 85,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400&h=400',
        brand: 'Merck',
        isFlashDeal: true,
        isBestSeller: false
    },
    {
        id: 'm7',
        name: 'Pregnacare Plus Omega 3',
        category: 'Pregnancy',
        originalPrice: 12500,
        price: 11500,
        rating: 4.9,
        reviews: 340,
        stock: 15,
        image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=400&h=400',
        brand: 'Vitabiotics',
        isFlashDeal: false,
        isBestSeller: true
    },
    {
        id: 'm8',
        name: 'Ibuprofen 400mg x10',
        category: 'Pain Relief',
        originalPrice: 800,
        price: 800,
        rating: 4.5,
        reviews: 67,
        stock: 200,
        image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=400&h=400',
        brand: 'Nurofen',
        isFlashDeal: false,
        isBestSeller: false
    }
];

const labTests = [{
        id: 'l1',
        name: 'Comprehensive Malaria Test',
        description: 'Rapid blood test for malaria parasites, results in 24hrs',
        price: 3500,
        homeService: true,
        labVisit: true,
        turnaround: '24hrs',
        rating: 4.8,
        reviews: 156,
        isPopular: true
    },
    {
        id: 'l2',
        name: 'Complete Blood Count',
        description: 'Full blood profile including RBC, WBC, platelets',
        price: 5000,
        homeService: true,
        labVisit: true,
        turnaround: '24hrs',
        rating: 4.9,
        reviews: 203,
        isPopular: true
    },
    {
        id: 'l3',
        name: 'Typhoid Test (Blood)',
        description: 'Test for typhoid antibodies and antigen',
        price: 2500,
        homeService: true,
        labVisit: true,
        turnaround: '24hrs',
        rating: 4.7,
        reviews: 89,
        isPopular: false
    },
    {
        id: 'l4',
        name: 'Pregnancy Test (Blood)',
        description: 'Quantitative hCG blood test for pregnancy confirmation',
        price: 2000,
        homeService: true,
        labVisit: true,
        turnaround: '2hrs',
        rating: 4.8,
        reviews: 312,
        isPopular: true
    },
    {
        id: 'l5',
        name: 'COVID-19 Antigen Test',
        description: 'Rapid antigen test for COVID-19 detection',
        price: 1500,
        homeService: true,
        labVisit: true,
        turnaround: '15mins',
        rating: 4.6,
        reviews: 456,
        isPopular: true
    },
    {
        id: 'l6',
        name: 'Liver Function Test',
        description: 'Complete hepatic panel test',
        price: 6000,
        homeService: true,
        labVisit: true,
        turnaround: '24hrs',
        rating: 4.9,
        reviews: 178,
        isPopular: false
    }
];

function formatNaira(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function calculateDiscount(original, discounted) {
    return Math.round((original - discounted) / original * 100);
}