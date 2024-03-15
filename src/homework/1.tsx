// # Завдання 1

// У вас є компонент React, який використовує useRef та IntersectionObserver для визначення, коли користувач переглядає кінець вмісту. Ваше завдання полягає в наступному:
// Встановіть правильні типи пропсів для цього компонента. У ньому є дві властивості: children і onContentEndVisible. children - це будь-який валідний React вузол, а onContentEndVisible - це функція без аргументів, що повертає void.
// Встановіть правильний тип useRef. Посилання endContentRef використовується для div, який міститься в кінці вмісту.
// Встановіть правильний тип для options (клас також може бути типом для options).

import React, { useEffect, useRef } from 'react';

// Опишіть Props
interface Props {
  children: React.ReactNode;
  onContentEndVisible?: () => void; 
}
export function Observer({ children, onContentEndVisible }: Props) {
  // Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
    const options: IntersectionObserverInit = {
      rootMargin: '0px',
      threshold: 1.0, //thresholds дозволяє визначити, яка частина елементу повинна бути видимою для того, щоб спрацювала подія спостереження.
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible && onContentEndVisible(); //перевірка існування функції
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}

//IntersectionObserverInit - це інтерфейс у TypeScript, який використовується для опису параметрів, які можна передати в конструктор IntersectionObserver. Він містить різні властивості: root, rootMargin та thresholds, які дозволяють налаштувати спостереження за взаємодією елементів на сторінці. 
//thresholds дозволяє визначити, яка частина елементу повинна бути видимою для того, щоб спрацювала подія спостереження.