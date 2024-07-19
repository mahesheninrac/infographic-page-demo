const categories = [
    {
      name: "Central",
      children: [
        {
          name: "CERC",
          children: ["orders", "petitions", "Draft regulations"],
        },
        {
          name: "MOP",
          children: ["Regulations", "policies", "announcments"],
        },
      ],
    },
    {
      name: "State",
      children: [
        {
          name: "Gujrat ",
          children: ["GERC"],
        },
        {
          name: "maharashtra",
          children: ["MERC"],
        },
      ],
    },
    {
      name: "Generation",
      children: [
        {
          name: "Thermal",
          children: ["GERC"],
        },
        {
          name: "Wind",
          children: ["MERC"],
        },
        {
          name: "Biomass",
          children: ["MERC"],
        },
        {
          name: "shb",
          children: ["MERC"],
        },
        {
          name: "Bess",
          children: ["MERC"],
        },
      ],
    },
    {
      name: "Distribution",
      children: [],
    },
    {
      name: "Transmission",
      children: [],
    },
    {
      name: "bidupdates",
      children: [],
    },
    {
      name: "new energies",
      children: [],
    },
    {
      name: "Infographic",
      children: [],
    },
    {
      name: "solar rooftop",
      children: [],
    },
    {
      name: "Open Access",
      children: [
        {
          name: "Solar ",
          children: ["Regulations", "Policies", "others"],
        },
        {
          name: "Wind",
          children: ["Regulations", "Policies", "others"],
        },
        {
          name: "wind",
          children: ["Regulations", "Policies", "others"],
        },
      ],
    },
  ];

  function createCategoryTree() {
    const categoryTree = document.getElementById("categoryTree");
    categoryTree.innerHTML = "";

    categories.forEach((category, index) => {
      const categoryElement = document.createElement("div");
      categoryElement.classList.add("category-item", "parent");
      categoryElement.innerHTML = `
        <h2 class="mb-3 text-white fw-600 fs-14">${category.name}</h2>
        <div class="children hidden" data-parent="${index}"></div>
    `;
      categoryTree.appendChild(categoryElement);

      const childrenContainer = categoryElement.querySelector(".children");
      category.children.forEach((child, childIndex) => {
        const childElement = document.createElement("div");
        childElement.classList.add(
          "category-item",
          "child",
          "ms-4",
          "mb-2"
        );
        childElement.innerHTML = `
            <h4>${child.name}</h4>
            <div class="grandchildren hidden" data-parent="${index}" data-child="${childIndex}"></div>
        `;
        childrenContainer.appendChild(childElement);

        const grandchildrenContainer =
          childElement.querySelector(".grandchildren");
        child.children.forEach((grandchild) => {
          const grandchildElement = document.createElement("div");
          grandchildElement.classList.add(
            "category-item",
            "grandchild",
            "ms-4",
            "mb-1"
          );
          grandchildElement.innerHTML = `<p>${grandchild}</p>`;
          grandchildrenContainer.appendChild(grandchildElement);
        });
      });
    });

    addEventListeners();
  }

  function addEventListeners() {
    const parents = document.querySelectorAll(".parent");
    const children = document.querySelectorAll(".child");

    parents.forEach((parent) => {
      parent.addEventListener("click", (e) => {
        if (e.target === parent || e.target.tagName === "H2") {
          toggleChildren(parent);
        }
      });
    });

    children.forEach((child) => {
      child.addEventListener("click", (e) => {
        if (e.target === child || e.target.tagName === "H4") {
          toggleGrandchildren(child);
        }
      });
    });
  }

  function toggleChildren(parent) {
    const childrenContainer = parent.querySelector(".children");
    const otherParents = document.querySelectorAll(".parent");

    otherParents.forEach((otherParent) => {
      if (otherParent !== parent) {
        const otherChildrenContainer =
          otherParent.querySelector(".children");
        otherChildrenContainer.classList.add("hidden");

        const otherGrandchildrenContainers =
          otherParent.querySelectorAll(".grandchildren");
        otherGrandchildrenContainers.forEach((container) => {
          container.classList.add("hidden");
        });
      }
    });

    childrenContainer.classList.toggle("hidden");
  }

  function toggleGrandchildren(child) {
    const grandchildrenContainer = child.querySelector(".grandchildren");
    grandchildrenContainer.classList.toggle("hidden");
  }

  createCategoryTree();