"use client";
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, Check, Save, User } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AccountEditPage = () => {
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    name: "Jane Smith",
    email: "jane.smith@example.com",
    username: "janesmith",
    bio: "Product designer and developer based in New York",
    avatar: "/api/placeholder/150/150",
    notifications: {
      email: true,
      marketing: false,
      socialUpdates: true,
      securityAlerts: true
    }
  });

  const handleSave = () => {
    // Simulate saving with a small delay
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 2000);
    }, 1000);
  };

  const handleInputChange = (field:string, value:any) => {
    setUserData({
      ...userData,
      [field]: value
    });
  };

  const handleNotificationChange = (field:string, value:any) => {
    setUserData({
      ...userData,
      notifications: {
        ...userData.notifications,
        [field]: value
      }
    });
  };

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-gray-500">Manage your account information and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and public profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback><User size={32} /></AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  {/* <FormLabel htmlFor="name">Full Name</FormLabel> */}
                  <Input 
                    id="name" 
                    value={userData.name} 
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  {/* <FormLabel htmlFor="email">Email</FormLabel> */}
                  <Input 
                    id="email" 
                    type="email" 
                    value={userData.email} 
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  {/* <FormLabel htmlFor="username">Username</FormLabel> */}
                  <Input 
                    id="username" 
                    value={userData.username} 
                    onChange={(e) => handleInputChange('username', e.target.value)}
                  />
                  {/* <FormDescription> */}
                    This is your public username
                  {/* </FormDescription> */}
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  {/* <FormLabel htmlFor="bio">Bio</FormLabel> */}
                  <Input 
                    id="bio" 
                    value={userData.bio} 
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                  />
                  {/* <FormDescription> */}
                    A brief description for your profile
                  {/* </FormDescription> */}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSave} disabled={saveStatus === "saving"}>
                {saveStatus === "saving" ? "Saving..." : 
                 saveStatus === "success" ? <Check className="mr-2" size={16} /> : 
                 <Save className="mr-2" size={16} />}
                {saveStatus === "success" ? "Saved" : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    {/* <FormLabel className="text-base">Email Notifications</FormLabel> */}
                    {/* <FormDescription>Receive notifications via email</FormDescription> */}
                  </div>
                  <Switch 
                    checked={userData.notifications.email}
                    onCheckedChange={(value) => handleNotificationChange('email', value)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    {/* <FormLabel className="text-base">Marketing Emails</FormLabel> */}
                    {/* <FormDescription>Receive marketing and promotional emails</FormDescription> */}
                  </div>
                  <Switch 
                    checked={userData.notifications.marketing}
                    onCheckedChange={(value) => handleNotificationChange('marketing', value)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    {/* <FormLabel className="text-base">Social Updates</FormLabel> */}
                    {/* <FormDescription>Receive updates about follows, mentions and replies</FormDescription> */}
                  </div>
                  <Switch 
                    checked={userData.notifications.socialUpdates}
                    onCheckedChange={(value) => handleNotificationChange('socialUpdates', value)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    {/* <FormLabel className="text-base">Security Alerts</FormLabel> */}
                    {/* <FormDescription>Get important security alerts and updates</FormDescription> */}
                  </div>
                  <Switch 
                    checked={userData.notifications.securityAlerts}
                    // onCheckedChange={(value) => handleNotificationChange('securityAlerts', value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saveStatus === "saving"}>
                {saveStatus === "saving" ? "Saving..." : 
                 saveStatus === "success" ? <Check className="mr-2" size={16} /> : 
                 <Save className="mr-2" size={16} />}
                {saveStatus === "success" ? "Saved" : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  For security reasons, you'll need to confirm your current password to make changes.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  {/* <FormLabel htmlFor="current-password">Current Password</FormLabel> */}
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  {/* <FormLabel htmlFor="new-password">New Password</FormLabel> */}
                  <Input id="new-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  {/* <FormLabel htmlFor="confirm-password">Confirm New Password</FormLabel> */}
                  <Input id="confirm-password" type="password" />
                  {/* <FormDescription> */}
                    Password must be at least 8 characters and include a number and special character
                  {/* </FormDescription> */}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saveStatus === "saving"}>
                {saveStatus === "saving" ? "Updating..." : 
                 saveStatus === "success" ? <Check className="mr-2" size={16} /> : 
                 <Save className="mr-2" size={16} />}
                {saveStatus === "success" ? "Updated" : "Update Password"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountEditPage;