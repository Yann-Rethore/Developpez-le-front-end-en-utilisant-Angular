import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicsData } from 'src/app/core/models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-country-detail',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss'
})
export class CountryDetailComponent implements OnInit {
countryData: OlympicsData |  undefined;
  chartData: {name: string; series: {name: string; value: number}[]}[] = [];

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
    })
  }
}

