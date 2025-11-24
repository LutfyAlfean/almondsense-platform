import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TeamMember from "@/components/TeamMember";
import { Sprout, Target, Lightbulb, Heart } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import lutfiImg from "@/assets/team/lutfi.jpg";
import radityaImg from "@/assets/team/raditya.jpg";
import raffuadImg from "@/assets/team/raffuad.jpg";
import naazilaImg from "@/assets/team/naazila.jpg";
import indahImg from "@/assets/team/indah.jpg";
import triImg from "@/assets/team/tri.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(38, 45, 96, 0.7), rgba(30, 50, 35, 0.8)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-6">
            <Sprout className="w-16 h-16 text-accent mx-auto animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            AlmondSense
          </h1>
          <p className="text-2xl md:text-3xl text-almond-light font-semibold mb-8">
            Data Akurat, Pertanian Lebih Cerdas
          </p>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-12">
            Platform teknologi agrikultur berbasis IoT dan AI untuk pemantauan lahan, 
            analisis tanaman, dan pengambilan keputusan berbasis data.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/layanan">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
                Mulai Konsultasi
              </Button>
            </Link>
            <a href="#about">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                Pelajari Lebih Lanjut
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Target className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Visi</h3>
              <p className="text-muted-foreground">
                Menjadi pelopor solusi pertanian digital di Indonesia yang membantu petani 
                dan pelaku agribisnis meningkatkan produktivitas melalui teknologi yang 
                mudah diakses dan akurat.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Lightbulb className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Misi</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>• Sistem pemantauan lahan real-time</li>
                <li>• Insight berbasis AI untuk keputusan</li>
                <li>• Analisis tanaman, cuaca, dan tanah</li>
                <li>• Platform terjangkau untuk semua</li>
                <li>• Transformasi digital berkelanjutan</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Sprout className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Tujuan</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>• Meningkatkan hasil panen</li>
                <li>• Mengurangi risiko gagal panen</li>
                <li>• Solusi untuk semua skala</li>
                <li>• Ekosistem agritech terintegrasi</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Heart className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Filosofi</h3>
              <p className="text-muted-foreground">
                "Teknologi untuk bumi yang lebih subur."
              </p>
              <p className="text-muted-foreground mt-4 text-sm">
                AlmondSense percaya bahwa data dapat membantu petani membuat keputusan 
                yang lebih tepat, efisien, dan menguntungkan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Tim Kami
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Dipimpin oleh para ahli di bidang teknologi, agrikultur, dan bisnis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember
              name="Muhammad Lutfi Alfian"
              role="Chief Executive Officer (CEO)"
              description="Arah strategis, kemitraan pertanian, dan ekspansi pasar."
              image={lutfiImg}
            />
            <TeamMember
              name="Muhammad Raditya Anwar"
              role="Chief Technology Officer (CTO)"
              description="Pengembangan teknologi IoT, AI, dan integrasi sistem."
              image={radityaImg}
            />
            <TeamMember
              name="Raffuad Munawir"
              role="Chief Operating Officer (COO)"
              description="Operasional harian, monitoring proyek lapangan, dan pelatihan petani."
              image={raffuadImg}
            />
            <TeamMember
              name="Naazila Alfa Syahrin"
              role="Chief Product Officer (CPO)"
              description="Pengembangan fitur aplikasi, UX, dan roadmap digital."
              image={naazilaImg}
            />
            <TeamMember
              name="Nur Indah"
              role="Chief Financial Officer (CFO)"
              description="Pengelolaan keuangan, model bisnis, dan pendanaan."
              image={indahImg}
            />
            <TeamMember
              name="Tri Nurjulyanti"
              role="Chief Marketing Officer (CMO)"
              description="Edukasi pasar, branding, dan komunitas petani digital."
              image={triImg}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Siap Meningkatkan Produktivitas Pertanian Anda?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Konsultasikan kebutuhan pertanian Anda dengan tim ahli kami
          </p>
          <Link to="/layanan">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
              Hubungi Kami Sekarang
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-brown text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm opacity-90">
            © 2025 AlmondSense. Teknologi untuk bumi yang lebih subur.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
