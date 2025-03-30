import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicsData } from 'src/app/core/models/Olympic';



@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
  standalone : false
})
export class CountryDetailComponent implements OnInit {
  view: [number, number] = [700, 400]; // Dimensions par défaut
  countryData: OlympicsData |  undefined;
  chartData: {name: string; series: {name: string; value: number}[]}[] = [];
  totalParticipations: number = 0;
  totalMedals: number = 0;
  totalAthletes: number = 0;


  constructor(private route: ActivatedRoute,
    private olympicService: OlympicService
  ) { }

  ngOnInit(): void {
    const countryId = Number(this.route.snapshot.paramMap.get('id'));

    this.olympicService.getOlympics().subscribe((data: OlympicsData[]) => {
      this.countryData = data.find((item) => item.id === countryId);
      console.log(this.countryData); // Affiche les données du pays sélectionné
      this.chartData = [{
        name: this.countryData?.country || '',
        series: this.countryData?.participations.map((participation) => ({
          name: participation.year.toString(),
          value: participation.medalsCount
        })) || []
      }];
    this.totalParticipations = this.countryData?.participations.length || 0;

    this.totalMedals = this.countryData?.participations.reduce((sum, participation) => 
      sum + participation.medalsCount, 0) || 0;

    this.totalAthletes = this.countryData?.participations.reduce((sum, participation) =>
      sum + participation.athleteCount, 0) || 0;
    })


    this.updateChartSize(); // Met à jour la taille au chargement

  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateChartSize(); // Met à jour la taille lors du redimensionnement
  }

  private updateChartSize(): void {
    const width = window.innerWidth * 0.8; // 80% de la largeur de l'écran
    const height = window.innerHeight * 0.5; // 50% de la hauteur de l'écran
    this.view = [width, height];
  }

  
}



