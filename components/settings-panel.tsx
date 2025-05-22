"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPanel() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("english")
  const [currency, setCurrency] = useState("usd")

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your account settings and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Company Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="TripSync Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Company Email</Label>
                  <Input id="company-email" defaultValue="admin@tripsync.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Company Phone</Label>
                  <Input id="company-phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">Company Website</Label>
                  <Input id="company-website" defaultValue="https://tripsync.com" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Regional Settings</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="jpy">JPY (¥)</SelectItem>
                      <SelectItem value="cad">CAD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-8">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-12">UTC-12:00</SelectItem>
                      <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                      <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                      <SelectItem value="utc-0">UTC+00:00 (GMT)</SelectItem>
                      <SelectItem value="utc+1">UTC+01:00 (Central European Time)</SelectItem>
                      <SelectItem value="utc+8">UTC+08:00 (China Standard Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Appearance</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable dark mode for the dashboard</p>
                </div>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications about important events</p>
                </div>
                <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  disabled={!notificationsEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                  disabled={!notificationsEnabled}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Types</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-service">New Service Requests</Label>
                  <Switch id="new-service" defaultChecked disabled={!notificationsEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="service-updates">Service Status Updates</Label>
                  <Switch id="service-updates" defaultChecked disabled={!notificationsEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-driver">New Driver Registrations</Label>
                  <Switch id="new-driver" defaultChecked disabled={!notificationsEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-user">New User Registrations</Label>
                  <Switch id="new-user" defaultChecked disabled={!notificationsEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="payments">Payment Notifications</Label>
                  <Switch id="payments" defaultChecked disabled={!notificationsEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="system">System Alerts</Label>
                  <Switch id="system" defaultChecked disabled={!notificationsEnabled} />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your account security and authentication.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Change Password</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button className="mt-2">Update Password</Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Session Management</h3>
              <div className="space-y-2">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Chrome on Windows • IP: 192.168.1.1</p>
                      <p className="text-sm text-muted-foreground">Started: May 21, 2023 at 10:30 AM</p>
                    </div>
                    <Button variant="outline" size="sm">
                      End Session
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Log Out of All Sessions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="api" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>API Settings</CardTitle>
            <CardDescription>Manage your API keys and access.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">API Keys</h3>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium">Production API Key</p>
                      <p className="text-sm text-muted-foreground">Last used: May 21, 2023</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Show Key
                      </Button>
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium">Development API Key</p>
                      <p className="text-sm text-muted-foreground">Last used: May 20, 2023</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Show Key
                      </Button>
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Webhook Configuration</h3>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" placeholder="https://your-server.com/webhook" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-secret">Webhook Secret</Label>
                <Input id="webhook-secret" type="password" value="••••••••••••••••" readOnly />
              </div>
              <div className="space-y-2">
                <Label>Webhook Events</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="event-service">service.created</Label>
                    <Switch id="event-service" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="event-payment">payment.completed</Label>
                    <Switch id="event-payment" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="event-user">user.registered</Label>
                    <Switch id="event-user" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="event-driver">driver.registered</Label>
                    <Switch id="event-driver" defaultChecked />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">API Documentation</h3>
              <div className="rounded-md border p-4">
                <p className="text-sm">Access our API documentation to learn how to integrate with our services.</p>
                <Button variant="outline" className="mt-2">
                  View Documentation
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
