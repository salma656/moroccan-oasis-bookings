
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Wifi, Car, Coffee, Filter, Search } from "lucide-react";

const Hotels = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchCity, setSearchCity] = useState(searchParams.get("city") || "");
  const [sortBy, setSortBy] = useState("price");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [starFilter, setStarFilter] = useState("all");

  const hotels = [
    {
      id: 1,
      name: "Riad Atlas Marrakech",
      city: "Marrakech",
      price: 850,
      rating: 4.8,
      stars: 5,
      image: "photo-1466442929976-97f336a657be",
      description: "Traditional riad in the heart of Medina with rooftop terrace",
      amenities: ["wifi", "parking", "restaurant"],
      reviews: 324
    },
    {
      id: 2,
      name: "Hotel Hassan II Casablanca",
      city: "Casablanca",
      price: 1200,
      rating: 4.6,
      stars: 4,
      image: "photo-1487958449943-2429e8be8625",
      description: "Modern luxury hotel near Hassan II Mosque",
      amenities: ["wifi", "parking", "restaurant"],
      reviews: 256
    },
    {
      id: 3,
      name: "Palais Faraj Fès",
      city: "Fès",
      price: 950,
      rating: 4.7,
      stars: 5,
      image: "photo-1518005020951-eccb494ad742",
      description: "Historic palace hotel with panoramic views",
      amenities: ["wifi", "restaurant"],
      reviews: 189
    },
    {
      id: 4,
      name: "Hotel Kenzi Farah Marrakech",
      city: "Marrakech",
      price: 650,
      rating: 4.3,
      stars: 4,
      image: "photo-1649972904349-6e44c42644a7",
      description: "Contemporary hotel with traditional Moroccan touches",
      amenities: ["wifi", "parking"],
      reviews: 412
    },
    {
      id: 5,
      name: "Riad Maison Bleue Fès",
      city: "Fès",
      price: 750,
      rating: 4.5,
      stars: 4,
      image: "photo-1433086966358-54859d0ed716",
      description: "Charming riad with beautiful courtyard and spa",
      amenities: ["wifi", "restaurant"],
      reviews: 167
    },
    {
      id: 6,
      name: "Hotel Villa Maroc Essaouira",
      city: "Essaouira",
      price: 480,
      rating: 4.2,
      stars: 3,
      image: "photo-1426604966848-d7adac402bff",
      description: "Coastal hotel with ocean views and traditional architecture",
      amenities: ["wifi"],
      reviews: 203
    }
  ];

  const filteredHotels = hotels
    .filter(hotel => 
      searchCity === "" || hotel.city.toLowerCase().includes(searchCity.toLowerCase())
    )
    .filter(hotel => 
      hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    )
    .filter(hotel => 
      starFilter === "all" || hotel.stars.toString() === starFilter
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "parking":
        return <Car className="h-4 w-4" />;
      case "restaurant":
        return <Coffee className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BM</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                BookMorocco
              </h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
              <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/register")} className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                Register
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Filter className="h-5 w-5 text-red-600" />
                  <h3 className="text-lg font-semibold">Filters</h3>
                </div>

                {/* Search by City */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Search City
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Enter city name"
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Price Range (MAD per night)
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2000}
                    min={0}
                    step={50}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0]} MAD</span>
                    <span>{priceRange[1]} MAD</span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Hotel Stars
                  </label>
                  <Select value={starFilter} onValueChange={setStarFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All stars" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Price (Low to High)</SelectItem>
                      <SelectItem value="rating">Rating (High to Low)</SelectItem>
                      <SelectItem value="name">Name (A to Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hotels List */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Hotels in Morocco
              </h2>
              <p className="text-gray-600">
                {filteredHotels.length} hotels found
              </p>
            </div>

            <div className="space-y-6">
              {filteredHotels.map((hotel) => (
                <Card 
                  key={hotel.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => navigate(`/hotel/${hotel.id}`)}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-80 h-48 md:h-auto">
                      <img
                        src={`https://images.unsplash.com/${hotel.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {hotel.name}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{hotel.city}</span>
                            <div className="flex ml-4">
                              {[...Array(hotel.stars)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-semibold">{hotel.rating}</span>
                            <span className="text-sm text-gray-500 ml-1">
                              ({hotel.reviews} reviews)
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-red-600">
                              {hotel.price} MAD
                            </span>
                            <p className="text-sm text-gray-500">per night</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{hotel.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {hotel.amenities.map((amenity) => (
                            <Badge
                              key={amenity}
                              variant="secondary"
                              className="flex items-center space-x-1"
                            >
                              {getAmenityIcon(amenity)}
                              <span className="capitalize">{amenity}</span>
                            </Badge>
                          ))}
                        </div>
                        <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No hotels found matching your criteria.
                </p>
                <Button
                  onClick={() => {
                    setSearchCity("");
                    setPriceRange([0, 2000]);
                    setStarFilter("all");
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
