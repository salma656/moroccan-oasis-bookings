
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
    name: "Chambre Riad Supérieure",
    price: 850,
    capacity: 2,
    beds: "1 Lit King",
    amenities: ["WiFi Gratuit", "Climatisation", "Salle de Bain Privée", "Balcon"]
  };

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return { nights: 0, subtotal: 0, taxes: 0, total: 0 };
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const subtotal = room.price * nights;
    const taxes = subtotal * 0.14; // 14% tax
    return { nights, subtotal, taxes, total: subtotal + taxes };
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut || !firstName || !lastName || !email || !phone) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Simulate booking process
    toast.success("Réservation confirmée! Vérifiez votre e-mail pour les détails.");
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
                <span>Retour</span>
              </Button>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BM</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  BookMaroc
                </h1>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" onClick={() => navigate("/hotels")}>Hôtels</Button>
              <Button variant="ghost" onClick={() => navigate("/login")}>Connexion</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Finaliser Votre Réservation</h1>
          <p className="text-gray-600">Vous êtes à un pas de votre aventure marocaine</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stay Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-red-600" />
                  Détails de Votre Séjour
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Date d'Arrivée *
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
                          {checkIn ? format(checkIn, "dd MMM yyyy") : "Sélectionner"}
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
                      Date de Départ *
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
                          {checkOut ? format(checkOut, "dd MMM yyyy") : "Sélectionner"}
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
                      Nombre de Voyageurs
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
                  Informations du Voyageur
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Prénom *
                    </label>
                    <Input
                      placeholder="Entrez le prénom"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Nom de Famille *
                    </label>
                    <Input
                      placeholder="Entrez le nom de famille"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Adresse E-mail *
                    </label>
                    <Input
                      type="email"
                      placeholder="Entrez l'adresse e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Numéro de Téléphone *
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
                    Demandes Spéciales (Optionnel)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows={3}
                    placeholder="Toute demande spéciale ou préférence..."
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
                  Politiques de Réservation
                </h3>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 mt-0.5 text-green-600" />
                    <span>Annulation gratuite jusqu'à 24 heures avant l'arrivée</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CreditCard className="h-4 w-4 mt-0.5 text-blue-600" />
                    <span>Aucun prépaiement nécessaire - payez à l'établissement</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 mt-0.5 text-purple-600" />
                    <span>Votre réservation est protégée par notre garantie</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Résumé de la Réservation</h3>
                
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
                      <span>Jusqu'à {room.capacity} voyageurs</span>
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
                      <span>{room.price} MAD × {totals.nights} nuits</span>
                      <span>{totals.subtotal} MAD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxes et frais</span>
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
                  {totals.nights > 0 ? `Réserver - ${Math.round(totals.total)} MAD` : "Finaliser la Réservation"}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Vous ne serez pas débité pour le moment
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
