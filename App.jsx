import React, { useState } from 'react';

const questions = [
  { id: 1, text: "Benimkinden farklı fikirlere sahip olsalar da, insanların kararlarını etkilemeyi severim.", group: "GÜÇ" },
  { id: 2, text: "Bir işi yaparken mükemmel olacak diye aşırı titizlenirim.", group: "BAŞARI" },
  { id: 3, text: "İnsanların bir araya geldiği organizasyonlara katılmaktan çok keyif alırım.", group: "BAĞLANMA" },
  { id: 4, text: "Düşünmemi derinleştiren ortamları çok severim.", group: "DÜŞÜNME" },
  { id: 5, text: "İnsanların yanlış bulduğum düşüncelerini değiştirmeyi severim.", group: "GÜÇ" },
  { id: 6, text: "İşimde en iyisi olacağım diye çok çalışmak bana göredir.", group: "BAŞARI" },
  { id: 7, text: "Boş zamanlarımı arkadaşlarımla geçirmeyi severim.", group: "BAĞLANMA" },
  { id: 8, text: "Farklı bir bakış açısını anlamak için kafa yormaktan kendimi alamam.", group: "DÜŞÜNME" },
  { id: 9, text: "İnsanları benim doğrularım yönünde etkilemeyi severim.", group: "GÜÇ" },
  { id: 10, text: "Mükemmeliyetçi bir yapım vardır.", group: "BAŞARI" },
  { id: 11, text: "Sevdiğim biriyle ilişkim bozulursa çok üzülürüm.", group: "BAĞLANMA" },
  { id: 12, text: "Yoğun düşünmek başlı başına zevkli bir iştir.", group: "DÜŞÜNME" },
  { id: 13, text: "Ekip çalışmasında yönlendirici olmayı severim.", group: "GÜÇ" },
  { id: 14, text: "Yaptığım her işi kusursuz yapmazsam rahat edemem.", group: "BAŞARI" },
  { id: 15, text: "İnsanları dertli görürsem ilgilenirim.", group: "BAĞLANMA" },
  { id: 16, text: "Farklı sonuçların olduğu sorunlar ilgimi çeker.", group: "DÜŞÜNME" },
  { id: 17, text: "Dikkatlerin üzerimde olmasını severim.", group: "GÜÇ" },
  { id: 18, text: "Bir iş yaparken çok daha iyisini yapmaya çalışırım.", group: "BAŞARI" },
  { id: 19, text: "İnsanların zor günlerinde onların yanında olmayı önemserim.", group: "BAĞLANMA" },
  { id: 20, text: "Yeni öğrenme anlarının sunduğu zevki çok severim.", group: "DÜŞÜNME" },
  { id: 21, text: "Bir ortamda konuşmaların merkezinde olmayı severim.", group: "GÜÇ" },
  { id: 22, text: "Yeni bir işte mükemmel olana kadar çok çalışırım.", group: "BAŞARI" },
  { id: 23, text: "İnsanların zor günlerinde mutlaka yanlarında olurum.", group: "BAĞLANMA" },
  { id: 24, text: "Her zaman yeni şeyler öğrenmenin yolunu ararım.", group: "DÜŞÜNME" }
];

export default function App() {
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (id, value) => {
    setResponses({ ...responses, [id]: Number(value) });
  };

  const handleSubmit = () => {
    const groups = { GÜÇ: [], BAŞARI: [], BAĞLANMA: [], DÜŞÜNME: [] };
    questions.forEach(q => {
      const val = responses[q.id] || 0;
      groups[q.group].push(val);
    });

    const groupAverages = Object.fromEntries(
      Object.entries(groups).map(([k, v]) => [k, v.reduce((a, b) => a + b, 0) / v.length])
    );

    const total = Object.values(groupAverages).reduce((a, b) => a + b, 0);
    const percentages = Object.fromEntries(
      Object.entries(groupAverages).map(([k, v]) => [k, ((v / total) * 100).toFixed(1)])
    );

    setResult(percentages);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Motivasyon Kaynakları Ölçeği</h1>
      {questions.map(q => (
        <div key={q.id} className="mb-4">
          <p className="mb-2">{q.id}. {q.text}</p>
          <input
            type="range"
            min="1"
            max="5"
            value={responses[q.id] || 3}
            onChange={e => handleChange(q.id, e.target.value)}
            className="w-full"
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Sonuçları Göster
      </button>

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Motivasyon Dağılımı (%)</h2>
          <ul>
            {Object.entries(result).map(([k, v]) => (
              <li key={k}>{k}: {v}%</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
