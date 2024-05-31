---
date: 2024-04-04 00:00:00
title: Test
author: bluestar
desc: "<3"
---

# h1

## h2

### h3

#### h4

### <a name="head1234"></a>A Heading in this SO entry!

#### Image

![Pale Blue Dot](https://science.nasa.gov/wp-content/uploads/2023/09/P36254.jpg "Pale Blue Dot")

#### Video

<video src="https://media.discordapp.net/attachments/1245643123166806108/1245648992960909392/almost.mp4?ex=66598486&is=66583306&hm=a98168d8e554e1820114a527987bd1545c690f13db48ea717e954522a5abcda4&" width="320" height="240" controls></video>

<p class="text-blue-500">Hello from raw html</p>

#### Code

```javascript
console.log("hai UwU")
```

---

#### And Code

```js
const fetch = require("node-fetch")

// Fetch data from SpaceX API
fetch("https://api.spacexdata.com/v4/launches")
  .then((response) => response.json())
  .then((data) => {
    // Display the launches in the console
    data.forEach((launch) => {
      console.log(`Name: ${launch.name}`)
      console.log(`Date: ${new Date(launch.date_utc).toLocaleDateString()}`)
      console.log(
        `Details: ${launch.details ? launch.details : "No details available"}`,
      )
      console.log("---")
    })
  })
  .catch((error) => console.error("Error fetching SpaceX data:", error))
```

1. **Python:**

   ```python
   print("Hello, World!")
   ```

2. **JavaScript:**

   ```javascript
   console.log("Hello, World!")
   ```

3. **Java:**

   ```java
   public class Main {
       public static void main(String[] args) {
           System.out.println("Hello, World!");
       }
   }
   ```

4. **C:**

   ```c
   #include <stdio.h>
   int main() {
       printf("Hello, World!\n");
       return 0;
   }
   ```

5. **C++:**

   ```cpp
   #include <iostream>
   int main() {
       std::cout << "Hello, World!" << std::endl;
       return 0;
   }
   ```

6. **C#:**

   ```csharp
   using System;
   class Program {
       static void Main() {
           Console.WriteLine("Hello, World!");
       }
   }
   ```

7. **Ruby:**

   ```ruby
   puts "Hello, World!"
   ```

8. **Rust:**

   ```rust
   fn main() {
       println!("Hello, World!");
   }
   ```

9. **Go:**

   ```go
   package main
   import "fmt"
   func main() {
       fmt.Println("Hello, World!")
   }
   ```

10. **Swift:**

    ```swift
    print("Hello, World!")
    ```

11. **Kotlin:**

    ```kotlin
    fun main() {
        println("Hello, World!")
    }
    ```

12. **Perl:**

    ```perl
    print "Hello, World!\n";
    ```

13. **PHP:**

    ```php
    <?php
    echo "Hello, World!\n";
    ```

14. **R:**

    ```r
    cat("Hello, World!\n")
    ```

15. **Shell/Bash:**

    ```bash
    echo "Hello, World!"
    ```

16. **Markdown:**
    ```markdown
    Hello, World!
    ```

#### Best answer is in this [link](#head1234)
