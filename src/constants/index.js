import Choco from '../models/Choco';
import ChocolateVanilla from '../models/ChocolateVanilla';
import ChocolateChocolate from '../models/ChocolateChocolate';
import ChocolateStrawberry from '../models/ChocolateStrawberry';
import ChocolateCaramel from '../models/ChocolateCaramel';

import Strawberry from '../models/Strawberry';
import StrawberryChoco from '../models/StrawberryChoco';
import StrawberryStrawberry from '../models/StrawberryStrawberry';
import StrawberryVanilla from '../models/StrawberryVanila';
import StrawberryCaramel from '../models/StrawberryCaramel';

import Vanilla from '../models/Vanilla';
import VanillaVanilla from '../models/VanillaSugar';
import VanillaCaramel from '../models/VanillaCaramel';
import VanillaStrawberry from '../models/VanillaStrawberry';
import VanillaChocolate from '../models/VanillaChocolate';

import Caramel from '../models/Caramel';
import CaramelVanilla from '../models/CaramelSugar';
import CaramelChocolate from '../models/CaramelChocolate';
import CaramelStrawberry from '../models/CaramelStrawberry';
import CaramelCaramel from '../models/CaramelCaramel';

import {staticDonutList} from "../store/slices/donutSlice"


export const modelMap = {
    Chocolate: Choco,
    ChocolateSugar: ChocolateVanilla,
    ChocolateChocolate: ChocolateChocolate,
    ChocolateStrawberry: ChocolateStrawberry,
    ChocolateCaramel: ChocolateCaramel,
    
    Strawberry: Strawberry,
    StrawberryChocolate: StrawberryChoco,
    StrawberryStrawberry: StrawberryStrawberry,
    StrawberrySugar: StrawberryVanilla,
    StrawberryCaramel: StrawberryCaramel,
  
    Vanilla: Vanilla,
    VanillaSugar: VanillaVanilla,
    VanillaCaramel: VanillaCaramel,
    VanillaStrawberry: VanillaStrawberry,
    VanillaChocolate: VanillaChocolate,
  
    Caramel: Caramel,
    CaramelSugar: CaramelVanilla,
    CaramelChocolate: CaramelChocolate,
    CaramelStrawberry: CaramelStrawberry,
    CaramelCaramel: CaramelCaramel
  };


export const validPages = {
  "about us": "/about",
  "cart page": "/cart",
  "contact": "/contact",
  "create donut" : "/createDonut",
  "create box" : "/createBox",
  "home": "/",
  "shop": "/shop"
}

export const validDonuts = {
  'vanilla whisk': staticDonutList[0],
  'berry melt': staticDonutList[1],
  'caramel dream': staticDonutList[2],
  'chocolate wish': staticDonutList[3],
  'berry bliss': staticDonutList[4],
  'choco swirl': staticDonutList[5],
  'berry chocolate': staticDonutList[6],
  'chocolate delux': staticDonutList[7],
  'vanilla cloud': staticDonutList[8],
  'double chocolate': staticDonutList[9]
}
  
export const paymentMethods = [
  { src: "/images/visa.png", alt: "Visa" },
  { src: "/images/mastercard.png", alt: "Mastercard" },
  { src: "/images/paypal.png", alt: "PayPal" },
  { src: "/images/bitcoin.png", alt: "Bitcoin" }
];

