import { Directive, ElementRef, Input, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Coordinates } from 'src/app/auth/interfaces/Coordinates';
import { LoadBingmapsService } from './load-bingmaps.service';

@Directive({
  selector: '[appBmMap]',
  standalone: true,
})
export class BmMapDirective implements OnInit {
  @Input({ required: true }) set coords(coords: Coordinates) {
    this.#coords = coords;
    this.#map()?.setView({
      center: new Microsoft.Maps.Location(coords.latitude, coords.longitude),
    });
  }
  #map: WritableSignal<Microsoft.Maps.Map | null> = signal(null);
  #coords!: Coordinates;
  #element = inject(ElementRef);
  #loadService = inject(LoadBingmapsService);

  async ngOnInit() {
    this.#map.set(await this.#loadService.createMap(
      this.#coords,
      this.#element.nativeElement
    ));
  }

  get map() {
    return this.#map.asReadonly();
  }
}
