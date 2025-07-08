
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Calendar, Star, CreditCard, Settings, LogOut, Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<any>({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setEditedUser(parsed);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const mockBookings = [
    {
      id: 1,
      hotelName: "Riad Atlas Marrakech",
      city: "Marrakech",
      roomType: "Superior Riad Room",
      checkIn: "2024-08-15",
      checkOut: "2024-08-18",
      guests: 2,
      total: 2550,
      status: "confirmed",
      image: "photo-1466442929976-97f336a657be"
    },
    {
      id: 2,
      hotelName: "Hotel Hassan II Casablanca",
      city: "Casablanca",
      roomType: "Deluxe Room",
      checkIn: "2024-07-22",
      checkOut: "2024-07-25",
      guests: 2,
      total: 3600,
      status: "completed",
      image: "photo-1487958449943-2429e8be8625"
    },
    {
      id: 3,
      hotelName: "Palais Faraj Fès",
      city: "Fès",
      roomType: "Standard Suite",
      checkIn: "2024-09-10",
      checkOut: "2024-09-13",
      guests: 3,
      total: 2850,
      status: "upcoming",
      image: "photo-1518005020951-eccb494ad742"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSaveProfile = () => {
    setUser(editedUser);
    localStorage.setItem("user", JSON.stringify(editedUser));
    setEditMode(false);
    toast.success("Profile updated successfully");
  };

  const handleCancelEdit = () => {
    setEditedUser(user);
    setEditMode(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
              <Button variant="ghost" onClick={() => navigate("/hotels")}>Hotels</Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and view your bookings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{user.name || "User"}</h3>
                <p className="text-gray-600 text-sm mb-4">{user.email}</p>
                <Badge variant="secondary" className="mb-4">
                  Member since 2024
                </Badge>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Bookings</span>
                    <span className="font-semibold">{mockBookings.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Spent</span>
                    <span className="font-semibold">9,000 MAD</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="profile">Profile Settings</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="mt-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Your Bookings</h3>
                    <Button onClick={() => navigate("/hotels")} className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                      Book Another Hotel
                    </Button>
                  </div>

                  {mockBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-48 h-32">
                            <img
                              src={`https://images.unsplash.com/${booking.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                              alt={booking.hotelName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-lg font-semibold mb-1">{booking.hotelName}</h4>
                                <div className="flex items-center text-gray-600 mb-2">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{booking.city}</span>
                                </div>
                                <p className="text-sm text-gray-600">{booking.roomType}</p>
                              </div>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600">Check-in</p>
                                <p className="font-semibold">{booking.checkIn}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Check-out</p>
                                <p className="font-semibold">{booking.checkOut}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Guests</p>
                                <p className="font-semibold">{booking.guests}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Total</p>
                                <p className="font-semibold text-red-600">{booking.total} MAD</p>
                              </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                              <div className="text-sm text-gray-600">
                                Booking ID: #{booking.id.toString().padStart(6, '0')}
                              </div>
                              <div className="space-x-2">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                {booking.status === "upcoming" && (
                                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="h-5 w-5" />
                        <span>Profile Information</span>
                      </CardTitle>
                      {!editMode ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditMode(true)}
                          className="flex items-center space-x-2"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span>Edit</span>
                        </Button>
                      ) : (
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEdit}
                            className="flex items-center space-x-2"
                          >
                            <X className="h-4 w-4" />
                            <span>Cancel</span>
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSaveProfile}
                            className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                          >
                            <Save className="h-4 w-4" />
                            <span>Save</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            value={editMode ? editedUser.name || "" : user.name || ""}
                            onChange={(e) => editMode && setEditedUser({...editedUser, name: e.target.value})}
                            className="pl-10"
                            disabled={!editMode}
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            value={editMode ? editedUser.email || "" : user.email || ""}
                            onChange={(e) => editMode && setEditedUser({...editedUser, email: e.target.value})}
                            className="pl-10"
                            disabled={!editMode}
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            value={editMode ? editedUser.phone || "" : user.phone || ""}
                            onChange={(e) => editMode && setEditedUser({...editedUser, phone: e.target.value})}
                            className="pl-10"
                            disabled={!editMode}
                            placeholder="+212 6XX XXX XXX"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            value={editMode ? editedUser.location || "" : user.location || ""}
                            onChange={(e) => editMode && setEditedUser({...editedUser, location: e.target.value})}
                            className="pl-10"
                            disabled={!editMode}
                            placeholder="Your city, Morocco"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold">Account Security</h4>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Mail className="h-4 w-4 mr-2" />
                          Update Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Notifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Booking Confirmations</p>
                            <p className="text-sm text-gray-600">Receive emails when bookings are confirmed</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Special Offers</p>
                            <p className="text-sm text-gray-600">Get notified about deals and promotions</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Reminder Emails</p>
                            <p className="text-sm text-gray-600">Reminders before your check-in date</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 rounded" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold">Default Preferences</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Preferred City</label>
                          <Input placeholder="Marrakech" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Default Guests</label>
                          <Input placeholder="2" type="number" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
