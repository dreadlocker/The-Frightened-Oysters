import { Injectable } from '@angular/core';

export class PromotionsService {
  constructor() { }

  promotions = [
    {
      image: 'http://cdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a7-2017.jpg',
      name: 'Samsung Galaxy A7 (2017)',
    },
    {
      image: 'http://cdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a9-pro1.jpg',
      name: 'Samsung Galaxy A9 Pro',
    },
    {
      image: 'http://cdn2.gsmarena.com/vv/bigpic/samsung-gear-s3-classic-lte.jpg',
      name: 'Samsung Gear S3 classic LTE',
    }
  ];

  getAll() { return this.promotions; }
}

