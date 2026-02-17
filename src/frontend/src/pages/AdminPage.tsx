import { useState } from 'react';
import AdminGate from '@/components/admin/AdminGate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGetAllAdmissions, useGetAllInquiries } from '@/hooks/useAdmissions';
import CsvExportButton from '@/components/admin/CsvExportButton';
import { Search, FileDown, Users, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminPage() {
  const [admissionSearch, setAdmissionSearch] = useState('');
  const [inquirySearch, setInquirySearch] = useState('');

  const { data: admissions = [], isLoading: admissionsLoading } = useGetAllAdmissions();
  const { data: inquiries = [], isLoading: inquiriesLoading } = useGetAllInquiries();

  const filteredAdmissions = admissions.filter((admission) =>
    admission.name.toLowerCase().includes(admissionSearch.toLowerCase()) ||
    admission.aadhaar.includes(admissionSearch)
  );

  const filteredInquiries = inquiries.filter((inquiry) =>
    inquiry.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
    inquiry.phone.includes(inquirySearch)
  );

  return (
    <AdminGate>
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-luxury font-bold heading-luxury mb-4">
              Admin Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage admissions and inquiries
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="bg-card/50 border-gold/20">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-gold/10 rounded-full">
                  <Users className="h-8 w-8 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Admissions</p>
                  <p className="text-3xl font-bold text-gold">{admissions.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-gold/20">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-gold/10 rounded-full">
                  <MessageSquare className="h-8 w-8 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Inquiries</p>
                  <p className="text-3xl font-bold text-gold">{inquiries.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="admissions" className="max-w-6xl mx-auto">
            <TabsList className="w-full justify-start bg-card/50 border border-gold/20">
              <TabsTrigger value="admissions" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                Admissions
              </TabsTrigger>
              <TabsTrigger value="inquiries" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                Inquiries
              </TabsTrigger>
            </TabsList>

            {/* Admissions Tab */}
            <TabsContent value="admissions" className="mt-6">
              <Card className="bg-card/50 border-gold/20">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle className="text-gold">Admission Applications</CardTitle>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search by name or Aadhaar..."
                          value={admissionSearch}
                          onChange={(e) => setAdmissionSearch(e.target.value)}
                          className="pl-9 bg-background/50 border-gold/20"
                        />
                      </div>
                      <CsvExportButton data={filteredAdmissions} filename="admissions" type="admissions" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {admissionsLoading ? (
                    <p className="text-center text-muted-foreground py-8">Loading...</p>
                  ) : filteredAdmissions.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No admissions found</p>
                  ) : (
                    <div className="space-y-4">
                      {filteredAdmissions.map((admission) => (
                        <div key={Number(admission.id)} className="p-4 bg-background/50 border border-gold/20 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Name</p>
                              <p className="text-sm font-semibold text-foreground">{admission.name}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Package</p>
                              <p className="text-sm text-gold">{admission.packageSelected}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Date</p>
                              <p className="text-sm text-foreground">
                                {format(new Date(Number(admission.timestamp) / 1000000), 'MMM dd, yyyy')}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Phone</p>
                              <p className="text-sm text-foreground">{admission.address.postalCode}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Payment Mode</p>
                              <p className="text-sm text-foreground">{admission.paymentMode}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Status</p>
                              <p className="text-sm text-gold capitalize">{admission.status.__kind__}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inquiries Tab */}
            <TabsContent value="inquiries" className="mt-6">
              <Card className="bg-card/50 border-gold/20">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle className="text-gold">Customer Inquiries</CardTitle>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search by name or phone..."
                          value={inquirySearch}
                          onChange={(e) => setInquirySearch(e.target.value)}
                          className="pl-9 bg-background/50 border-gold/20"
                        />
                      </div>
                      <CsvExportButton data={filteredInquiries} filename="inquiries" type="inquiries" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {inquiriesLoading ? (
                    <p className="text-center text-muted-foreground py-8">Loading...</p>
                  ) : filteredInquiries.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No inquiries found</p>
                  ) : (
                    <div className="space-y-4">
                      {filteredInquiries.map((inquiry) => (
                        <div key={Number(inquiry.id)} className="p-4 bg-background/50 border border-gold/20 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Name</p>
                              <p className="text-sm font-semibold text-foreground">{inquiry.name}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Phone</p>
                              <p className="text-sm text-foreground">{inquiry.phone}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Service</p>
                              <p className="text-sm text-gold">{inquiry.serviceInterested}</p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-xs text-muted-foreground">Message</p>
                              <p className="text-sm text-foreground">{inquiry.message}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Date</p>
                              <p className="text-sm text-foreground">
                                {format(new Date(Number(inquiry.timestamp) / 1000000), 'MMM dd, yyyy')}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminGate>
  );
}
