function allowDrop(event) {
  event.preventDefault();
}

function drag(event, element) {
  event.dataTransfer.setData("text", element);
}

function drop(event) {
  event.preventDefault();
  const element = event.dataTransfer.getData("text");
  const formPreview = document.getElementById("preview-form");

  if (element === "Layout") {
    const numRows = parseInt(prompt("Enter the number of rows:"));
    const numCols = parseInt(prompt("Enter the number of columns:"));
    
    if (!isNaN(numRows) && !isNaN(numCols)) {
      const layoutContainer = document.getElementById("Layout");
      layoutContainer.innerHTML = ''; // Clear existing layout, if any.
    
      const grid = document.createElement("div");
      grid.style.display = "grid";
      grid.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
      grid.style.gridTemplateColumns = `repeat(${numCols}, 1fr`;
      grid.style.width = "100%";
      grid.style.height = "100%";
    
      for (let i = 0; i < numRows * numCols; i++) {
        const cell = document.createElement("div");
        cell.style.border = "1px solid #ccc";
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
        cell.innerText = `Cell ${i + 1}`;
        grid.appendChild(cell);
      }
    
      layoutContainer.appendChild(grid);
    } else {
      alert("Please enter valid numbers for rows and columns.");
    }
    
   } else if (element === "Label") {
    const label = document.createElement("label");
    label.innerText = "Label Text:";
    const input = document.createElement("input");
    input.type = "text";
    formPreview.appendChild(label);
    formPreview.appendChild(input);
  } else if (element === "Text Box") {
    const textBox = document.createElement("input");
    textBox.type = "text";
    formPreview.appendChild(textBox);
  } else if (element === "Button") {
    const button = document.createElement("button");
    button.innerText = "Button";
    formPreview.appendChild(button);
  } else if (element === "Check Box") {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    formPreview.appendChild(checkbox);
    const label = document.createElement("label");
    label.innerText = "Check Box Label";
    formPreview.appendChild(label);
  } else if (element === "Radio Button") {
    const radio = document.createElement("input");
    radio.type = "radio";
    formPreview.appendChild(radio);
    const label = document.createElement("label");
    label.innerText = "Radio Button Label";
    formPreview.appendChild(label);
  }
  else if (element === "Table") {
    const numRows = parseInt(prompt("Enter the number of rows:"));
    const numCols = parseInt(prompt("Enter the number of columns:"));

    if (!isNaN(numRows) && !isNaN(numCols)) {
      formPreview.innerHTML = ''; // Clear existing form

      const table = document.createElement("table");
      for (let i = 0; i < numRows; i++) {
        const row = table.insertRow(i);
        for (let j = 0; j < numCols; j++) {
          const cell = row.insertCell(j);
          cell.innerText = `Row ${i + 1}, Col ${j + 1}`;
        }
      }

      formPreview.appendChild(table);
    } else {
      alert("Please enter valid numbers for rows and columns.");
    }
    }
 
else if (element === "Navigation") {
    const link = document.createElement("a");
    link.href = "#";
    link.innerText = "Navigation Link";
    formPreview.appendChild(link);
  } else if (element === "Image") {
    const image = document.createElement("img");
    image.src = "path_to_your_image.jpg"; 
    formPreview.appendChild(image);
  }
}
  function reloadPage() {
    window.location.reload();
  }
  function loadPreview() {
    const formPreview = document.getElementById("form-preview");
    const previewContent = formPreview.innerHTML;
  
    const newTab = window.open();
    const newTabDocument = newTab.document;
  
    newTabDocument.write(`
      <html>
      <head>
        <title>Form Preview</title>
      </head>
      <body>
        <div id="preview-content">
          ${previewContent}
        </div>
      </body>
      </html>
    `);
  
    newTabDocument.close();
  }
  function save() {
    const userChoice = prompt("Choose the format to save (JSON or CSV):");
    if (userChoice) {
      userChoice = userChoice.toLowerCase();
      if (userChoice === "json") {
        saveDataAs("json");
      } else if (userChoice === "csv") {
        saveDataAs("csv");
      } else {
        alert("Invalid choice. Please enter 'JSON' or 'CSV'.");
      }
    }
  }
  
  function saveDataAs(format) {
    const data = format === "json" ? getJSONData() : getCSVData();
    const blob = new Blob([data], { type: format === "json" ? "application/json" : "text/csv" });
    const filename = `data.${format}`;
    
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  function getJSONData() {
    const data = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };
    return JSON.stringify(data);
  }
  
  function getCSVData() {
    const data = [
      { name: "John", age: 30, city: "New York" },
      { name: "Jane", age: 25, city: "Los Angeles" },
      { name: "Bob", age: 35, city: "Chicago" },
    ];
    return (
      "data:text/csv;charset=utf-8," +
      data.map((item) => Object.values(item).join(",")).join("\n")
    );
  }