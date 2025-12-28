export const diseases = [
  /* ===================== POTATO ===================== */
  {
    crop: "potato",
    id: "potato-late-blight",
    name: "Potato Late Blight",
    scientificName: "Phytophthora infestans",
    remedies: {
      organic: [
        "Carefully inspect seed potatoes before storage",
        "Destroy infected plant debris",
        "Ensure proper field drainage",
        "Avoid overhead irrigation"
      ],
      chemical: [
        "Preventive fungicide spray before disease appearance",
        "Repeat spray at 7–10 day intervals as recommended"
      ]
    }
  },
  {
    crop: "potato",
    id: "potato-early-blight",
    name: "Potato Early Blight",
    scientificName: "Alternaria solani",
    remedies: {
      organic: [
        "Use disease-free seed tubers",
        "Apply balanced fertilizers",
        "Remove infected leaves early",
        "Follow crop rotation"
      ],
      chemical: [
        "Spray Urea 1%",
        "Quantity: 10 g per liter of water"
      ]
    }
  },

  /* ===================== TOMATO ===================== */
  {
    crop: "tomato",
    id: "tomato-late-blight",
    name: "Tomato Late Blight",
    scientificName: "Phytophthora infestans",
    remedies: {
      organic: [
        "Remove infected plant parts",
        "Improve air circulation",
        "Avoid excess moisture on leaves"
      ],
      chemical: [
        "Spray recommended fungicide at early stage",
        "Repeat at 7–10 day intervals"
      ]
    }
  },
  {
    crop: "tomato",
    id: "tomato-leaf-curl",
    name: "Tomato Leaf Curl Virus",
    scientificName: "Begomovirus",
    remedies: {
      organic: [
        "Use resistant varieties",
        "Remove infected plants immediately",
        "Control whitefly population"
      ],
      chemical: [
        "Spray Imidacloprid or Thiamethoxam as recommended"
      ]
    }
  },

  /* ===================== GARLIC ===================== */
  {
    crop: "garlic",
    id: "garlic-white-rot",
    name: "Garlic White Rot",
    scientificName: "Sclerotium cepivorum",
    remedies: {
      organic: [
        "Use disease-free cloves",
        "Practice long crop rotation",
        "Destroy infected plants"
      ],
      chemical: [
        "Soil treatment with recommended fungicide"
      ]
    }
  },

  /* ===================== WHEAT ===================== */
  {
    crop: "wheat",
    id: "wheat-rust",
    name: "Wheat Rust",
    scientificName: "Puccinia spp.",
    remedies: {
      organic: [
        "Grow rust-resistant wheat varieties",
        "Remove volunteer wheat plants",
        "Avoid excess nitrogen fertilization"
      ],
      chemical: [
        "Spray Propiconazole or Tebuconazole as recommended"
      ]
    }
  },

  /* ===================== COMMON PEST ===================== */
  {
    crop: "general",
    id: "stem-borer",
    name: "Stem Borer",
    scientificName: "Scirpophaga incertulas",
    remedies: {
      organic: [
        "Regular field monitoring for dead hearts",
        "Remove and destroy affected tillers"
      ],
      chemical: [
        "Acephate 75% SP: 666–1000 g/ha",
        "Follow recommended waiting period"
      ]
    }
  }
];
