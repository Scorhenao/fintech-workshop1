# 🏷️ Optimización de la Funcionalidad de Microcréditos Personalizados en una Fintech con NestJS

---

### 🎯 **Objetivo del Taller:**  
Los estudiantes aprenderán a aplicar los principios SOLID en un proyecto realista de una fintech, optimizando la calidad del código y mejorando su mantenibilidad.

---

### Introducción a SOLID

**¿Qué es SOLID?**

SOLID es un acrónimo que representa cinco principios fundamentales de la programación orientada a objetos que, cuando se aplican correctamente, ayudan a crear sistemas de software más robustos, flexibles y mantenibles. Estos principios fueron introducidos por Robert C. Martin y son considerados un estándar en el desarrollo de software.

**Principios SOLID:**

1. **S**ingle Responsibility Principle (SRP) - Principio de Responsabilidad Única
2. **O**pen/Closed Principle (OCP) - Principio de Abierto/Cerrado
3. **L**iskov Substitution Principle (LSP) - Principio de Sustitución de Liskov
4. **I**nterface Segregation Principle (ISP) - Principio de Segregación de Interfaces
5. **D**ependency Inversion Principle (DIP) - Principio de Inversión de Dependencias

Estos principios buscan mejorar la estructura del código, facilitando su mantenimiento, extensión y testeo. A continuación, veremos cómo aplicar cada uno de estos principios en la implementación de una funcionalidad de microcréditos en una fintech usando NestJS, y cómo sería el código si no se aplicaran estos principios.

---

### 📜 **Historia de Usuario:**  
"Como desarrollador de una fintech, quiero implementar una mejora en la funcionalidad de microcréditos que permita a los usuarios recibir ofertas personalizadas basadas en su historial de crédito y comportamiento financiero, de modo que puedan acceder a mejores condiciones de crédito de manera eficiente."

### **Entidades Clave**
- **User:** Representa a los usuarios de la plataforma.  
  **Atributos:**
  - `id: string`
  - `name: string`
  - `creditScore: number`
  - `financialHistory: FinancialRecord[]` (array de registros financieros)
  
- **Microcredit:** Representa una solicitud de microcrédito.  
  **Atributos:**
  - `id: string`
  - `userId: string`
  - `amount: number`
  - `interestRate: number`
  - `status: string`

---

## **Desglose del Taller con Código en NestJS**

### 1. **Principio S (Single Responsibility Principle) - Principio de Responsabilidad Única**

**¿Qué es?**

El principio de responsabilidad única establece que una clase debería tener una única responsabilidad o razón para cambiar. Esto significa que cada clase debe tener una única tarea o responsabilidad dentro del sistema.

#### Sin SRP (No se debería hacer):

```typescript
@Injectable()
export class MicrocreditService {
  constructor(private readonly userRepository: UserRepository) {}

  applyForMicrocredit(userId: string, amount: number): Microcredit {
    const user = this.userRepository.findById(userId);

    // Lógica para calcular la tasa de interés
    const interestRate = this.calculateInterestRate(user);

    // Lógica para registrar el microcrédito
    const microcredit = new Microcredit(userId, amount, interestRate, 'PENDING');
    this.saveMicrocredit(microcredit);

    return microcredit;
  }

  private calculateInterestRate(user: User): number {
    // Lógica de cálculo de tasa de interés basada en el historial de crédito
    return user.creditScore > 700 ? 5 : 15;
  }

  private saveMicrocredit(microcredit: Microcredit): void {
    // Lógica para guardar el microcrédito en la base de datos
  }
}
```

Este enfoque no respeta el principio de responsabilidad única ya que la clase MicrocreditService está realizando múltiples tareas: cálculo de la tasa de interés, validación del usuario, y registro del microcrédito.

#### Con SRP (Así se debería hacer):***

```typescript
@Injectable()
export class CreditCalculationService {
  calculateInterestRate(user: User): number {
    return user.creditScore > 700 ? 5 : 15;
  }
}

@Injectable()
export class MicrocreditRegistryService {
  saveMicrocredit(microcredit: Microcredit): void {
    // Lógica para guardar el microcrédito en la base de datos
  }
}

@Injectable()
export class MicrocreditService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly creditCalculationService: CreditCalculationService,
    private readonly microcreditRegistryService: MicrocreditRegistryService
  ) {}

  applyForMicrocredit(userId: string, amount: number): Microcredit {
    const user = this.userRepository.findById(userId);
    const interestRate = this.creditCalculationService.calculateInterestRate(user);
    const microcredit = new Microcredit(userId, amount, interestRate, 'PENDING');
    this.microcreditRegistryService.saveMicrocredit(microcredit);
    return microcredit;
  }
}

```

### 2. **Principio O (Open/Closed Principle) - Principio de Abierto/Cerrado**

**¿Qué es?**

El principio de Abierto/Cerrado establece que una clase debe estar abierta a la extensión pero cerrada a la modificación. Esto significa que deberíamos poder añadir nuevas funcionalidades sin alterar el código existente.

#### Sin OCP (No se debería hacer):

```typescript
@Injectable()
export class CreditCalculationService {
  calculateInterestRate(user: User): number {
    if (user.creditScore > 700) {
      return 5;
    } else if (user.creditScore > 500) {
      return 10;
    } else {
      return 15;
    }
  }
}
```

Este código viola el principio OCP porque cada vez que necesitamos modificar la lógica de cálculo de interés, debemos alterar el código existente.

#### Con OCP (Así se debería hacer):

```typescript
interface InterestRateStrategy {
  calculate(user: User): number;
}

@Injectable()
export class StandardInterestRateStrategy implements InterestRateStrategy {
  calculate(user: User): number {
    return user.creditScore > 700 ? 5 : 15;
  }
}

@Injectable()
export class PremiumInterestRateStrategy implements InterestRateStrategy {
  calculate(user: User): number {
    return user.creditScore > 700 ? 3 : 10;
  }
}

@Injectable()
export class CreditCalculationService {
  private strategy: InterestRateStrategy;

  constructor(strategy: InterestRateStrategy) {
    this.strategy = strategy;
  }

  calculateInterestRate(user: User): number {
    return this.strategy.calculate(user);
  }
}
```

Al utilizar una estrategia de cálculo de interés, podemos añadir nuevas estrategias sin modificar el código existente, haciendo que la clase esté abierta para la extensión pero cerrada a la modificación.

### 3. Principio L (Liskov Substitution Principle) - Principio de Sustitución de Liskov

***¿Qué es?***

El principio de Sustitución de Liskov establece que los objetos de una clase base deben poder ser reemplazados por objetos de una clase derivada sin alterar la funcionalidad del programa.

#### Sin LSP (No se debería hacer):

```typescript
class BasicMicrocredit extends Microcredit {
  constructor(userId: string, amount: number) {
    super(userId, amount, 'PENDING');
  }

  // Sobrescribe un método de la clase base, pero no funciona con todas las subclases
  override apply(): void {
    // Lógica específica para microcréditos básicos
  }
}

class AdvancedMicrocredit extends Microcredit {
  constructor(userId: string, amount: number) {
    super(userId, amount, 'APPROVED');
  }

  override apply(): void {
    // Lógica específica para microcréditos avanzados
  }
}
```

Este código rompe el principio de Liskov porque las subclases modifican el comportamiento de la clase base de manera que podría no ser esperado por otras partes del código.

#### Con LSP (Así se debería hacer):

```typescript
class Microcredit {
  apply(): void {
    // Lógica genérica para aplicar un microcrédito
  }
}

class BasicMicrocredit extends Microcredit {
  // No es necesario sobrescribir el método apply si no altera el comportamiento
}

class AdvancedMicrocredit extends Microcredit {
  // Aquí podrías extender el comportamiento si es necesario, pero sin romper el contrato
}
```

Las subclases deben respetar el comportamiento de la clase base, garantizando que cualquier clase que sustituya a la clase base mantendrá el comportamiento esperado.



<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install @nestjs/typeorm typeorm mysql2
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


# Para probar la API, puedes usar herramientas como Postman o curl. Por ejemplo, para solicitar un microcrédito:

- curl -X POST http://localhost:3000/microcredits -H "Content-Type: application/json" -d '{"userId": "some-user-id", "amount": 1000}'

## Explicación del Código

- SRP: Cada clase tiene una responsabilidad única. CreditCalculationService se encarga de calcular la tasa de interés, MicrocreditRepository maneja el almacenamiento, y MicrocreditService coordina el proceso de aplicación.

- OCP: La clase CreditCalculationService usa una estrategia de cálculo de interés que puede ser fácilmente extendida sin modificar el código existente. Puedes cambiar entre StandardInterestRateStrategy y PremiumInterestRateStrategy sin alterar CreditCalculationService.

- LSP: Las subclases de Microcredit (BasicMicrocredit y AdvancedMicrocredit) pueden sustituir a la clase base sin alterar el comportamiento esperado.

- ISP: Las interfaces están segregadas en InterestRateStrategy y sus implementaciones, permitiendo a las clases implementar solo las interfaces que necesitan.

- DIP: CreditCalculationService depende de la interfaz InterestRateStrategy, no de una implementación concreta, lo que facilita la sustitución de estrategias sin modificar el servicio.

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).