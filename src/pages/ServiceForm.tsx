import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Sprout } from "lucide-react";

const serviceFormSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi").max(100, "Nama maksimal 100 karakter"),
  email: z.string().trim().email("Email tidak valid").max(255, "Email maksimal 255 karakter"),
  phone: z.string().trim().max(20, "Nomor telepon maksimal 20 karakter").optional(),
  company: z.string().trim().max(100, "Nama perusahaan maksimal 100 karakter").optional(),
  land_size: z.string().trim().max(50, "Luas lahan maksimal 50 karakter").optional(),
  service_type: z.string().min(1, "Jenis layanan wajib dipilih"),
  message: z.string().trim().max(1000, "Pesan maksimal 1000 karakter").optional(),
});

const ServiceForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    land_size: "",
    service_type: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      const validated = serviceFormSchema.parse(formData);
      setLoading(true);

      const { error } = await supabase
        .from("service_requests")
        .insert([{
          name: validated.name,
          email: validated.email,
          phone: validated.phone || null,
          company: validated.company || null,
          land_size: validated.land_size || null,
          service_type: validated.service_type,
          message: validated.message || null,
        }]);

      if (error) throw error;

      toast.success("Permintaan layanan berhasil dikirim!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        land_size: "",
        service_type: "",
        message: "",
      });
      
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Mohon periksa kembali form Anda");
      } else {
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <Sprout className="w-16 h-16 text-accent mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Konsultasi Layanan</h1>
          <p className="text-muted-foreground">
            Isi form di bawah ini untuk mendapatkan solusi terbaik untuk kebutuhan pertanian Anda
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-lg p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Masukkan nama lengkap"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@example.com"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Nomor Telepon</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+62 812 3456 7890"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Nama Perusahaan / Usaha</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Nama perusahaan (opsional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="land_size">Luas Lahan</Label>
            <Input
              id="land_size"
              value={formData.land_size}
              onChange={(e) => setFormData({ ...formData, land_size: e.target.value })}
              placeholder="Contoh: 2 hektar"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service_type">Jenis Layanan *</Label>
            <Select
              value={formData.service_type}
              onValueChange={(value) => setFormData({ ...formData, service_type: value })}
            >
              <SelectTrigger className={errors.service_type ? "border-destructive" : ""}>
                <SelectValue placeholder="Pilih jenis layanan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monitoring">Pemantauan Lahan IoT</SelectItem>
                <SelectItem value="analysis">Analisis Tanaman & Tanah</SelectItem>
                <SelectItem value="ai_insight">AI-Powered Insight</SelectItem>
                <SelectItem value="full_solution">Solusi Lengkap</SelectItem>
                <SelectItem value="consultation">Konsultasi</SelectItem>
              </SelectContent>
            </Select>
            {errors.service_type && <p className="text-destructive text-sm">{errors.service_type}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Pesan / Kebutuhan Khusus</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Jelaskan kebutuhan atau pertanyaan Anda"
              rows={5}
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-accent hover:bg-accent/90"
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Kirim Permintaan"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              disabled={loading}
            >
              Kembali
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
