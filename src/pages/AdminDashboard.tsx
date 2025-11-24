import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Pencil, Trash2, LogOut, RefreshCw } from "lucide-react";

interface ServiceRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  land_size: string | null;
  service_type: string;
  message: string | null;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRequest, setEditingRequest] = useState<ServiceRequest | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("admin_authenticated");
    if (!isAuthenticated) {
      navigate("/AdminLabubu");
      return;
    }
    fetchRequests();
  }, [navigate]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("service_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      toast.error("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
      const { error } = await supabase
        .from("service_requests")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Data berhasil dihapus");
      fetchRequests();
    } catch (error) {
      toast.error("Gagal menghapus data");
    }
  };

  const handleEdit = (request: ServiceRequest) => {
    setEditingRequest(request);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRequest) return;

    try {
      const { error } = await supabase
        .from("service_requests")
        .update({
          name: editingRequest.name,
          email: editingRequest.email,
          phone: editingRequest.phone,
          company: editingRequest.company,
          land_size: editingRequest.land_size,
          service_type: editingRequest.service_type,
          message: editingRequest.message,
          status: editingRequest.status,
        })
        .eq("id", editingRequest.id);

      if (error) throw error;
      toast.success("Data berhasil diperbarui");
      setIsEditDialogOpen(false);
      fetchRequests();
    } catch (error) {
      toast.error("Gagal memperbarui data");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    toast.success("Logout berhasil");
    navigate("/AdminLabubu");
  };

  const getServiceTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      monitoring: "Pemantauan Lahan IoT",
      analysis: "Analisis Tanaman & Tanah",
      ai_insight: "AI-Powered Insight",
      full_solution: "Solusi Lengkap",
      consultation: "Konsultasi",
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Kelola permintaan layanan AlmondSense</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchRequests} variant="outline" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button onClick={handleLogout} variant="destructive" size="icon">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Memuat data...</p>
          </div>
        ) : (
          <div className="bg-card rounded-xl shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telepon</TableHead>
                  <TableHead>Layanan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Belum ada permintaan layanan
                    </TableCell>
                  </TableRow>
                ) : (
                  requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.name}</TableCell>
                      <TableCell>{request.email}</TableCell>
                      <TableCell>{request.phone || "-"}</TableCell>
                      <TableCell>{getServiceTypeLabel(request.service_type)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          request.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {request.status}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(request.created_at).toLocaleDateString('id-ID')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleEdit(request)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleDelete(request.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Permintaan Layanan</DialogTitle>
            </DialogHeader>
            {editingRequest && (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nama</Label>
                  <Input
                    id="edit-name"
                    value={editingRequest.name}
                    onChange={(e) => setEditingRequest({ ...editingRequest, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    value={editingRequest.email}
                    onChange={(e) => setEditingRequest({ ...editingRequest, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Telepon</Label>
                  <Input
                    id="edit-phone"
                    value={editingRequest.phone || ""}
                    onChange={(e) => setEditingRequest({ ...editingRequest, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-company">Perusahaan</Label>
                  <Input
                    id="edit-company"
                    value={editingRequest.company || ""}
                    onChange={(e) => setEditingRequest({ ...editingRequest, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-land-size">Luas Lahan</Label>
                  <Input
                    id="edit-land-size"
                    value={editingRequest.land_size || ""}
                    onChange={(e) => setEditingRequest({ ...editingRequest, land_size: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-service-type">Jenis Layanan</Label>
                  <Select
                    value={editingRequest.service_type}
                    onValueChange={(value) => setEditingRequest({ ...editingRequest, service_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monitoring">Pemantauan Lahan IoT</SelectItem>
                      <SelectItem value="analysis">Analisis Tanaman & Tanah</SelectItem>
                      <SelectItem value="ai_insight">AI-Powered Insight</SelectItem>
                      <SelectItem value="full_solution">Solusi Lengkap</SelectItem>
                      <SelectItem value="consultation">Konsultasi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingRequest.status}
                    onValueChange={(value) => setEditingRequest({ ...editingRequest, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-message">Pesan</Label>
                  <Textarea
                    id="edit-message"
                    value={editingRequest.message || ""}
                    onChange={(e) => setEditingRequest({ ...editingRequest, message: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit" className="bg-accent hover:bg-accent/90">
                    Simpan Perubahan
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
