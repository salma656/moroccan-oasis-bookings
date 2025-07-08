
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ArrowLeft, Users, BedDouble, CreditCard, Shield, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hotelId = searchParams.get("hotel");
  const roomId = searchParams.get("room");

  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Mock data
  const hotel = {
    name: "Riad Atlas Marrakech",
    city: "Marrakech",
    rating: 4.8,
    stars: 5
  };

  const room = {
    name: "Superior Riad Room",
    price: 850,
    capacity: 2,
    beds: "1 King Bed",
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Balcony"]
  };

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const subtotal = room.price * nights;
    const taxes = subtotal * 0.14; // 14% tax
    return { nights, subtotal, taxes, total: subtotal + taxes };
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut || !firstName || !lastName || !email || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate booking process
    toast.success("Booking confirmed! Check your email for details.");
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  const totals = calculateTotal();

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
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">You're just one step away from your Moroccan adventure</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stay Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-red-600" />
                  Your Stay Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Check-in Date *
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkIn && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          initialFocus
                          className="pointer-events-auto"
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Check-out Date *
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkOut && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          initialFocus
                          className="pointer-events-auto"
                          disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Number of Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="number"
                        placeholder="2"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="pl-10"
                        min="1"
                        max={room.capacity}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guest Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-red-600" />
                  Guest Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      First Name *
                    </label>
                    <Input
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Last Name *
                    </label>
                    <Input
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      placeholder="+212 6XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows={3}
                    placeholder="Any special requests or preferences..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Booking Policies */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-red-600" />
                  Booking Policies
                </h3>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 mt-0.5 text-green-600" />
                    <span>Free cancellation until 24 hours before check-in</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CreditCard className="h-4 w-4 mt-0.5 text-blue-600" />
                    <span>No prepayment needed - pay at the property</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 mt-0.5 text-purple-600" />
                    <span>Your booking is protected by our guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                
                {/* Hotel Info */}
                <div className="mb-6">
                  <h4 className="font-semibold">{hotel.name}</h4>
                  <p className="text-sm text-gray-600">{hotel.city}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{hotel.rating}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Room Info */}
                <div className="mb-6">
                  <h4 className="font-semibold">{room.name}</h4>
                  <div className="space-y-1 text-sm text-gray-600 mt-2">
                    <div className="flex items-center">
                      <BedDouble className="h-4 w-4 mr-2" />
                      <span>{room.beds}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Up to {room.capacity} guests</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {room.amenities.slice(0, 2).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Price Breakdown */}
                {totals.nights > 0 && (
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>{room.price} MAD × {totals.nights} nights</span>
                      <span>{totals.subtotal} MAD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxes & fees</span>
                      <span>{Math.round(totals.taxes)} MAD</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-red-600">{Math.round(totals.total)} MAD</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleBooking}
                  size="lg"
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  disabled={!checkIn || !checkOut || totals.nights <= 0}
                >
                  {totals.nights > 0 ? `Book Now - ${Math.round(totals.total)} MAD` : "Complete Booking"}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  You will not be charged yet
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
