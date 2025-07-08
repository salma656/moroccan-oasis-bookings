
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Wifi, Car, Coffee, Users, BedDouble, Calendar, ArrowLeft, Phone, Mail } from "lucide-react";

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  // Mock hotel data
  const hotel = {
    id: parseInt(id || "1"),
    name: "Riad Atlas Marrakech",
    city: "Marrakech",
    address: "Rue Riad Zitoun El Jdid, Medina, 40000 Marrakech",
    rating: 4.8,
    stars: 5,
    reviews: 324,
    images: [
      "photo-1466442929976-97f336a657be",
      "photo-1487958449943-2429e8be8625",
      "photo-1518005020951-eccb494ad742",
      "photo-1649972904349-6e44c42644a7"
    ],
    description: "Experience the authentic charm of Morocco at Riad Atlas Marrakech, a beautifully restored traditional riad located in the heart of the historic Medina. This enchanting property combines traditional Moroccan architecture with modern luxury amenities.",
    amenities: [
      { name: "Free WiFi", icon: "wifi" },
      { name: "Parking", icon: "parking" },
      { name: "Restaurant", icon: "restaurant" },
      { name: "Rooftop Terrace", icon: "terrace" },
      { name: "Spa & Wellness", icon: "spa" },
      { name: "24/7 Reception", icon: "reception" }
    ],
    rooms: [
      {
        id: 1,
        name: "Standard Riad Room",
        price: 650,
        capacity: 2,
        size: "25 sqm",
        beds: "1 Double Bed",
        amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom"],
        image: "photo-1649972904349-6e44c42644a7"
      },
      {
        id: 2,
        name: "Superior Riad Room",
        price: 850,
        capacity: 2,
        size: "35 sqm",
        beds: "1 King Bed",
        amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Balcony"],
        image: "photo-1488590528505-98d2b5aba04b"
      },
      {
        id: 3,
        name: "Deluxe Suite",
        price: 1200,
        capacity: 4,
        size: "50 sqm",
        beds: "1 King Bed + Sofa Bed",
        amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Living Area", "Terrace"],
        image: "photo-1433086966358-54859d0ed716"
      }
    ]
  };

  const getAmenityIcon = (iconType: string) => {
    switch (iconType) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "parking":
        return <Car className="h-4 w-4" />;
      case "restaurant":
        return <Coffee className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const handleBookRoom = (roomId: number) => {
    navigate(`/booking?hotel=${hotel.id}&room=${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BM</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  BookMorocco
                </h1>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" onClick={() => navigate("/hotels")}>Hotels</Button>
              <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/register")} className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                Register
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hotel Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{hotel.address}</span>
                </div>
                <div className="flex items-center">
                  {[...Array(hotel.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-xl font-bold">{hotel.rating}</span>
                <span className="text-gray-500 ml-2">({hotel.reviews} reviews)</span>
              </div>
              <p className="text-sm text-gray-600">Excellent</p>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-2">
              <img
                src={`https://images.unsplash.com/${hotel.images[0]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                alt={hotel.name}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {hotel.images.slice(1, 3).map((image, index) => (
                <img
                  key={index}
                  src={`https://images.unsplash.com/${image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                  alt={`${hotel.name} view ${index + 2}`}
                  className="w-full h-36 object-cover rounded-lg"
                />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              <img
                src={`https://images.unsplash.com/${hotel.images[3]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                alt={`${hotel.name} view 4`}
                className="w-full h-36 object-cover rounded-lg"
              />
              <div className="bg-gray-200 rounded-lg h-36 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                <span className="text-gray-600 font-medium">View All Photos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">About This Hotel</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{hotel.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Popular Amenities</h4>
                        <div className="space-y-2">
                          {hotel.amenities.slice(0, 3).map((amenity, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              {getAmenityIcon(amenity.icon)}
                              <span className="text-gray-700">{amenity.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-600" />
                            <span className="text-gray-700">+212 524 123 456</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-600" />
                            <span className="text-gray-700">info@riadatlas.ma</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rooms" className="mt-6">
                <div className="space-y-6">
                  {hotel.rooms.map((room) => (
                    <Card key={room.id}>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-80 h-48">
                            <img
                              src={`https://images.unsplash.com/${room.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                              alt={room.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-xl font-semibold mb-2">{room.name}</h4>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                  <div className="flex items-center">
                                    <BedDouble className="h-4 w-4 mr-1" />
                                    <span>{room.beds}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-1" />
                                    <span>Up to {room.capacity} guests</span>
                                  </div>
                                  <span>{room.size}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-2xl font-bold text-red-600">
                                  {room.price} MAD
                                </span>
                                <p className="text-sm text-gray-500">per night</p>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-2">
                                {room.amenities.map((amenity, index) => (
                                  <Badge key={index} variant="secondary">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <Button 
                              onClick={() => handleBookRoom(room.id)}
                              className="w-full md:w-auto bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                            >
                              Book This Room
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Hotel Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {hotel.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          {getAmenityIcon(amenity.icon)}
                          <span className="text-gray-700">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Booking</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium">Starting from</span>
                    <div className="text-right">
                      <span className="text-xl font-bold text-red-600">650 MAD</span>
                      <p className="text-xs text-gray-500">per night</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleBookRoom(hotel.rooms[0].id)}
                    size="lg" 
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    Book Now
                  </Button>
                  
                  <div className="text-center text-sm text-gray-500">
                    <p>Free cancellation</p>
                    <p>Best price guarantee</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
