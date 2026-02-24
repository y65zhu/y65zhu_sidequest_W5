class Letter {
  constructor(char, x, y) {
    this.char = char;
    this.worldX = x;
    this.worldY = y;

    this.collected = false;
    this.animating = false;

    this.startX = 0;
    this.startY = 0;

    this.skyX = 0;
    this.skyY = 0;

    this.t = 0; // animation progress
  }

  tryCollect(player) {
    if (this.collected) return false;

    const d = dist(this.worldX, this.worldY, player.x, player.y);
    if (d < player.r + 20) {
      this.collected = true;
      this.animating = true;
      this.startX = this.worldX;
      this.startY = this.worldY;
      this.t = 0;
      return true;
    }
    return false;
  }

  update() {
    if (this.animating) {
      this.t += 0.02;
      if (this.t >= 1) {
        this.t = 1;
        this.animating = false;
      }
    }
  }

  drawWorld() {
    if (this.collected) return;

    push();
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(255);
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = "rgba(255,255,255,0.7)";
    text(this.char, this.worldX, this.worldY + sin(frameCount * 0.05) * 4);
    drawingContext.shadowBlur = 0;
    pop();
  }

  drawSky() {
    if (!this.collected) return;

    let x = this.skyX;
    let y = this.skyY;

    if (this.animating) {
      const eased = this.easeOutCubic(this.t);
      x = lerp(this.startX - cam.x, this.skyX, eased);
      y = lerp(this.startY - cam.y, this.skyY, eased);
    }

    push();
    textAlign(CENTER, CENTER);
    textSize(44);
    fill(255);
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = "rgba(255,255,255,0.9)";
    text(this.char, x, y);
    drawingContext.shadowBlur = 0;
    pop();
  }

  easeOutCubic(t) {
    return 1 - pow(1 - t, 3);
  }
}
