
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPin, Users, Star, Camera } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState("2");

  const moroccanCities = [
    "Marrakech", "Casablanca", "Fès", "Rabat", "Agadir", 
    "Tangier", "Meknès", "Oujda", "Kenitra", "Tétouan"
  ];

  const featuredHotels = [
    {
      id: 1,
      name: "Riad Atlas Marrakech",
      city: "Marrakech",
      price: 850,
      rating: 4.8,
      image: "photo-1466442929976-97f336a657be",
      description: "Traditional riad in the heart of Medina"
    },
    {
      id: 2,
      name: "Hotel Hassan II Casablanca",
      city: "Casablanca",
      price: 1200,
      rating: 4.6,
      image: "photo-1487958449943-2429e8be8625",
      description: "Modern luxury hotel near Hassan II Mosque"
    },
    {
      id: 3,
      name: "Palais Faraj Fès",
      city: "Fès",
      price: 950,
      rating: 4.7,
      image: "photo-1518005020951-eccb494ad742",
      description: "Historic palace hotel with panoramic views"
    }
  ];

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      city: city || "Marrakech",
      checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : "",
      checkOut: checkOut ? format(checkOut, "yyyy-MM-dd") : "",
      guests: guests
    });
    navigate(`/hotels?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BM</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                BookMorocco
              </h1>
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

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Discover the Magic of
            <span className="block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Morocco
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            From the bustling souks of Marrakech to the blue streets of Chefchaouen, 
            find your perfect Moroccan getaway
          </p>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Choose city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="pl-10 h-12"
                      list="cities"
                    />
                    <datalist id="cities">
                      {moroccanCities.map((cityName) => (
                        <option key={cityName} value={cityName} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Check-in</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !checkIn && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? format(checkIn, "MMM dd") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Check-out</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !checkOut && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? format(checkOut, "MMM dd") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="2 guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSearch}
                size="lg"
                className="w-full h-14 text-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              >
                Search Hotels
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Hotels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredHotels.map((hotel) => (
              <Card 
                key={hotel.id} 
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => navigate(`/hotel/${hotel.id}`)}
              >
                <div className="relative h-48">
                  <img
                    src={`https://images.unsplash.com/${hotel.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{hotel.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{hotel.name}</h4>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hotel.city}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-600">
                      {hotel.price} MAD
                    </span>
                    <span className="text-sm text-gray-500">per night</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Morocco */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Morocco?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Rich Culture</h4>
              <p className="text-gray-600">
                Experience centuries of history, from ancient medinas to stunning architecture
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Diverse Landscapes</h4>
              <p className="text-gray-600">
                From Sahara Desert to Atlas Mountains, discover breathtaking scenery
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Hospitality</h4>
              <p className="text-gray-600">
                Warm Moroccan hospitality and world-class accommodation await you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BM</span>
                </div>
                <h3 className="text-xl font-bold">BookMorocco</h3>
              </div>
              <p className="text-gray-400">
                Your gateway to the best hotels in Morocco
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Popular Cities</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Marrakech Hotels</li>
                <li>Casablanca Hotels</li>
                <li>Fès Hotels</li>
                <li>Rabat Hotels</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Booking Policy</li>
                <li>Cancellation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Partners</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BookMorocco. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
