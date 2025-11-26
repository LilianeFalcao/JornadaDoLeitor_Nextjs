import { IReadingsRepository } from "../repositories/IReadingsRepository";
import { Reading_Status } from "../entity/Readings";

// Defina os parâmetros que o Use Case espera receber do front-end
interface UpdateReadingParams {
    id_user: string;
    id_manga: string;
    new_current_chapter: number;
    total_chapters: number; // Essencial para calcular o progresso
}

export class UpdateReading {
    constructor(private readonly readingRepository: IReadingsRepository) {}

    async execute(params: UpdateReadingParams): Promise<void> {
        const { id_user, id_manga, new_current_chapter, total_chapters } = params;

        // 1. 🔍 Buscar a Entidade Readings (Mutável)
        const readingToUpdate = await this.readingRepository.findByUserAndManga(id_user, id_manga);

        if (!readingToUpdate) {
            throw new Error(`Registro de leitura não encontrado.`);
        }

        // --- Lógica de Cálculo de Progresso e Status ---
        
        let newProgress = 0;
        let newStatus: Reading_Status;

        if (total_chapters > 0) {
            newProgress = Math.min(
                (new_current_chapter / total_chapters) * 100, 
                100 
            );
        }

        if (new_current_chapter >= total_chapters && total_chapters > 0) {
            newStatus = Reading_Status.COMPLETED;
        } else if (new_current_chapter === 0) {
             // Você não incluiu TO_READ no seu enum, vou usar READING como default para não concluído/não zero,
             // mas sugiro adicionar TO_READ ou ON_HOLD.
             newStatus = Reading_Status.READING; 
        } else {
            newStatus = Reading_Status.READING;
        }
        
        // 2. ✏️ Chamar o MÉTODO da Entity para realizar a mutação interna (Encapsulamento)
        // Isso é o que resolve o erro 'read-only' e mantém a lógica de negócios na Entity.
        readingToUpdate.updateProgress(
            new_current_chapter, 
            parseFloat(newProgress.toFixed(1)), 
            newStatus
        );
        
        // 3. 💾 Passar o objeto Readings mutado para o repositório salvar as mudanças
        // O método 'update' do repositório espera o objeto Readings completo.
        await this.readingRepository.update(readingToUpdate); 
    }
}