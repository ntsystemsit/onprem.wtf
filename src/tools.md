---
layout: default
title: Tools
---

<div class="tools-container">
  <h1>Tools</h1>
  <p>A collection of useful tools and utilities.</p>
  
  <div class="tools-grid">
    {% for tool in site.data.tools %}
    <div class="tool-card">
      <div class="tool-content">
        <h3 class="tool-title">{{ tool.name }}</h3>
        <p class="tool-description">{{ tool.description }}</p>
        <div class="tool-links">
          <a href="{{ tool.url }}" class="tool-link primary" target="_blank" rel="noopener">
            Go
          </a>
          <a href="{{ tool.repo }}" class="tool-link secondary" target="_blank" rel="noopener">
            Source
          </a>
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>

<style>
.tools-container {
  max-width: 740px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.tools-container h1 {
  text-align: center;
  margin-bottom: 0.5rem;
  color: var(--global-color);
}

.tools-container > p {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--global-color);
  font-size: 1.1rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.tool-card {
  background: var(--global-background);
  border: 1px solid var(--accent-color-2);
  border-radius: 3px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.tool-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tool-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tool-title {
  margin: 0 0 1rem 0;
  color: var(--global-color);
  font-size: 1.25rem;
  font-weight: 600;
  font-family: inherit;
}

.tool-description {
  margin: 0 0 1.5rem 0;
  color: var(--global-color);
  line-height: 1.8;
  flex-grow: 1;
}

.tool-links {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.tool-link {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-block;
  font-size: 0.9rem;
}

.tool-link.primary {
  background: var(--accent-color-2);
  color: var(--global-background);
}

.tool-link.primary:hover {
  background: var(--accent-color);
  color: var(--global-background);
}

.tool-link.secondary {
  background: transparent;
  color: var(--global-color);
  border: 1px solid var(--accent-color-2);
}

.tool-link.secondary:hover {
  background: var(--accent-color-2);
  color: var(--global-background);
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .tool-card {
    padding: 1.25rem;
  }
  
  .tool-links {
    flex-direction: column;
  }
  
  .tool-link {
    text-align: center;
  }
}

@media screen and (min-width: 576px) {
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 992px) {
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style> 