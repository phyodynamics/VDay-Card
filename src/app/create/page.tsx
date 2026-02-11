"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useLanguage } from "@/i18n/LanguageContext";
import { uploadImage } from "@/lib/imghippo";
import {
  CardElement,
  CardData,
  THEMES,
  FONT_OPTIONS,
  TEXT_TEMPLATES,
  BG_PATTERNS,
} from "@/lib/types";
import OverlayGuide from "@/components/OverlayGuide";
import StickerRenderer, {
  STICKER_CATEGORIES,
} from "@/components/ValentineStickers";
import {
  Heart,
  Flower2,
  Gift,
  Type,
  ImagePlus,
  Plus,
  X,
  Loader2,
  Upload,
  RotateCw,
  Copy,
  Trash2,
  ChevronDown,
  ChevronUp,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Sparkles,
  MessageSquareQuote,
} from "lucide-react";

export default function CreatePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [theme, setTheme] = useState("romantic");
  const [bgPattern, setBgPattern] = useState("none");
  const [elements, setElements] = useState<CardElement[]>([]);
  const [mainMessage, setMainMessage] = useState("");
  const [mainMessageFont, setMainMessageFont] = useState("dancing");
  const [mainMessageColor, setMainMessageColor] = useState("#e8477e");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [textInput, setTextInput] = useState("Happy Valentine's Day!");
  const [activeTab, setActiveTab] = useState<
    "stickers" | "text" | "upload" | "style"
  >("stickers");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "hearts",
  );

  const addElement = useCallback(
    (
      type: CardElement["type"],
      content: string,
      extra?: Partial<CardElement>,
    ) => {
      const el: CardElement = {
        id: uuidv4(),
        type,
        content,
        x: 10 + Math.random() * 55,
        y: 10 + Math.random() * 55,
        fontSize: type === "text" ? 22 : 48,
        fontColor: type === "text" ? "#e8477e" : undefined,
        fontFamily: type === "text" ? "dancing" : undefined,
        fontWeight: type === "text" ? 600 : undefined,
        fontStyle: "normal",
        textAlign: "center",
        stickerColor: "#e8477e",
        rotation: 0,
        opacity: 1,
        scale: 1,
        zIndex: elements.length + 1,
        ...extra,
      };
      setElements((prev) => [...prev, el]);
    },
    [elements.length],
  );

  const deleteElement = useCallback((id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    setSelectedElement(null);
  }, []);

  const duplicateElement = useCallback(
    (id: string) => {
      const el = elements.find((e) => e.id === id);
      if (!el) return;
      const newEl: CardElement = {
        ...el,
        id: uuidv4(),
        x: Math.min(el.x + 5, 85),
        y: Math.min(el.y + 5, 85),
        zIndex: elements.length + 1,
      };
      setElements((prev) => [...prev, newEl]);
      setSelectedElement(newEl.id);
    },
    [elements],
  );

  const updateElement = useCallback(
    (id: string, updates: Partial<CardElement>) => {
      setElements((prev) =>
        prev.map((el) => (el.id === id ? { ...el, ...updates } : el)),
      );
    },
    [],
  );

  const bringToFront = useCallback(
    (id: string) => {
      const maxZ = Math.max(...elements.map((e) => e.zIndex || 0));
      updateElement(id, { zIndex: maxZ + 1 });
    },
    [elements, updateElement],
  );

  const sendToBack = useCallback(
    (id: string) => {
      const minZ = Math.min(...elements.map((e) => e.zIndex || 0));
      updateElement(id, { zIndex: Math.max(0, minZ - 1) });
    },
    [elements, updateElement],
  );

  // Mouse drag
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, elementId: string) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const element = elements.find((el) => el.id === elementId);
      if (!element) return;
      setDragOffset({
        x: e.clientX - rect.left - (element.x / 100) * rect.width,
        y: e.clientY - rect.top - (element.y / 100) * rect.height,
      });
      setDragging(elementId);
      setSelectedElement(elementId);
    },
    [elements],
  );

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
      const y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;
      updateElement(dragging, {
        x: Math.max(0, Math.min(90, x)),
        y: Math.max(0, Math.min(90, y)),
      });
    };
    const up = () => setDragging(null);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [dragging, dragOffset, updateElement]);

  // Touch drag
  const handleTouchStart = useCallback(
    (e: React.TouchEvent, elementId: string) => {
      // Prevent scrolling on mobile
      // e.preventDefault(); // React's Partial<TouchEvent> might not support preventDefault depending on listener
      // We rely on touch-action: none in CSS for the element
      const canvas = canvasRef.current;
      if (!canvas) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const element = elements.find((el) => el.id === elementId);
      if (!element) return;
      setDragOffset({
        x: touch.clientX - rect.left - (element.x / 100) * rect.width,
        y: touch.clientY - rect.top - (element.y / 100) * rect.height,
      });
      setDragging(elementId);
      setSelectedElement(elementId);
    },
    [elements],
  );

  useEffect(() => {
    if (!dragging) return;
    const move = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = ((touch.clientX - rect.left - dragOffset.x) / rect.width) * 100;
      const y = ((touch.clientY - rect.top - dragOffset.y) / rect.height) * 100;
      updateElement(dragging, {
        x: Math.max(0, Math.min(90, x)),
        y: Math.max(0, Math.min(90, y)),
      });
    };
    const end = () => setDragging(null);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
    return () => {
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
  }, [dragging, dragOffset, updateElement]);

  // Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const remaining = 5 - uploadedImages.length;
    const toUpload = Array.from(files).slice(0, remaining);
    for (const file of toUpload) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File too large! Max 5MB.");
        continue;
      }
      setUploading(true);
      try {
        const result = await uploadImage(file);
        const imgUrl = result.direct_url;
        setUploadedImages((prev) => [...prev, imgUrl]);
        addElement("image", imgUrl);
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Failed to upload. Try again.");
      }
      setUploading(false);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    const imgUrl = uploadedImages[index];
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setElements((prev) =>
      prev.filter((el) => !(el.type === "image" && el.content === imgUrl)),
    );
  };

  // Generate
  const handleGenerate = async () => {
    setGenerating(true);
    const cardData: CardData = {
      theme,
      elements,
      mainMessage,
      mainMessageFont,
      mainMessageColor,
      bgPattern,
      createdAt: new Date().toISOString(),
    };
    try {
      const response = await fetch("/api/save-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
      });
      const result = await response.json();
      if (result.success) {
        router.push(`/share/${result.id}`);
      } else {
        alert("Failed to generate. Try again.");
      }
    } catch (err) {
      console.error("Generate failed:", err);
      alert("Error generating link.");
    }
    setGenerating(false);
  };

  const getFontCss = (fontId?: string) => {
    return (
      FONT_OPTIONS.find((f) => f.id === fontId)?.css || "var(--font-script)"
    );
  };

  const selectedEl = elements.find((el) => el.id === selectedElement);

  const sidebarTabs = [
    {
      id: "stickers" as const,
      icon: <Heart size={16} />,
      label: "Stickers",
    },
    { id: "text" as const, icon: <Type size={16} />, label: "Text" },
    {
      id: "upload" as const,
      icon: <ImagePlus size={16} />,
      label: "Upload",
    },
    {
      id: "style" as const,
      icon: <Palette size={16} />,
      label: "Style",
    },
  ];

  return (
    <div className="editor-page">
      <OverlayGuide />
      <div className="editor-layout">
        {/* Sidebar */}
        <motion.aside
          className="editor-sidebar"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tab Switcher */}
          <div className="sidebar-tabs">
            {sidebarTabs.map((tab) => (
              <button
                key={tab.id}
                className={`sidebar-tab ${activeTab === tab.id ? "sidebar-tab-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* == STICKERS TAB == */}
          {activeTab === "stickers" && (
            <div className="sidebar-tab-content">
              {/* Hearts */}
              <div className="sidebar-accordion">
                <button
                  className="accordion-header"
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === "hearts" ? null : "hearts",
                    )
                  }
                >
                  <span>
                    <Heart size={14} className="section-icon" />{" "}
                    {t("editor.hearts")}
                  </span>
                  {expandedCategory === "hearts" ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
                {expandedCategory === "hearts" && (
                  <motion.div
                    className="sticker-grid"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    {STICKER_CATEGORIES.hearts.map((s) => (
                      <button
                        key={s.id}
                        className="sticker-btn"
                        onClick={() => addElement("sticker", s.id)}
                        title={s.label}
                      >
                        <StickerRenderer stickerId={s.id} size={30} />
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Flowers */}
              <div className="sidebar-accordion">
                <button
                  className="accordion-header"
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === "flowers" ? null : "flowers",
                    )
                  }
                >
                  <span>
                    <Flower2 size={14} className="section-icon" />{" "}
                    {t("editor.flowers")}
                  </span>
                  {expandedCategory === "flowers" ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
                {expandedCategory === "flowers" && (
                  <motion.div
                    className="sticker-grid"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    {STICKER_CATEGORIES.flowers.map((s) => (
                      <button
                        key={s.id}
                        className="sticker-btn"
                        onClick={() => addElement("sticker", s.id)}
                        title={s.label}
                      >
                        <StickerRenderer stickerId={s.id} size={30} />
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Decorations */}
              <div className="sidebar-accordion">
                <button
                  className="accordion-header"
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === "decorations" ? null : "decorations",
                    )
                  }
                >
                  <span>
                    <Gift size={14} className="section-icon" />{" "}
                    {t("editor.bouquets")}
                  </span>
                  {expandedCategory === "decorations" ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
                {expandedCategory === "decorations" && (
                  <motion.div
                    className="sticker-grid"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    {STICKER_CATEGORIES.decorations.map((s) => (
                      <button
                        key={s.id}
                        className="sticker-btn"
                        onClick={() => addElement("sticker", s.id)}
                        title={s.label}
                      >
                        <StickerRenderer stickerId={s.id} size={30} />
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* == TEXT TAB == */}
          {activeTab === "text" && (
            <div className="sidebar-tab-content">
              {/* Main Message */}
              <div className="sidebar-section">
                <h3>
                  <MessageSquareQuote size={14} className="section-icon" />{" "}
                  {t("editor.mainMessage")}
                </h3>
                <textarea
                  rows={3}
                  placeholder={t("editor.messagePlaceholder")}
                  value={mainMessage}
                  onChange={(e) => setMainMessage(e.target.value)}
                  className="editor-textarea"
                />
                <div className="mini-controls">
                  <select
                    value={mainMessageFont}
                    onChange={(e) => setMainMessageFont(e.target.value)}
                    className="mini-select"
                  >
                    {FONT_OPTIONS.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="color"
                    value={mainMessageColor}
                    onChange={(e) => setMainMessageColor(e.target.value)}
                    className="mini-color"
                    title="Message color"
                  />
                </div>
              </div>

              {/* Add Custom Text */}
              <div className="sidebar-section">
                <h3>
                  <Plus size={14} className="section-icon" /> Add Text
                </h3>
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Type something..."
                  className="editor-input"
                />
                <button
                  className="add-text-btn"
                  onClick={() => {
                    if (textInput.trim()) addElement("text", textInput.trim());
                  }}
                >
                  <Plus size={15} /> {t("editor.addText")}
                </button>
              </div>

              {/* Text Templates */}
              <div className="sidebar-section">
                <h3>
                  <Sparkles size={14} className="section-icon" /> Quick Text
                </h3>
                {TEXT_TEMPLATES.map((cat) => (
                  <div key={cat.label} className="template-category">
                    <p className="template-label">{cat.label}</p>
                    <div className="template-grid">
                      {cat.texts.map((text) => (
                        <button
                          key={text}
                          className="template-btn"
                          onClick={() => addElement("text", text)}
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* == UPLOAD TAB == */}
          {activeTab === "upload" && (
            <div className="sidebar-tab-content">
              <div className="sidebar-section">
                <h3>
                  <ImagePlus size={14} className="section-icon" />{" "}
                  {t("editor.uploadImages")}
                </h3>
                <p className="helper-text">{t("editor.uploadLimit")}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                {uploadedImages.length < 5 && (
                  <div
                    className="upload-area"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploading ? (
                      <Loader2
                        size={28}
                        className="upload-icon"
                        style={{ animation: "spin 1s linear infinite" }}
                      />
                    ) : (
                      <Upload size={28} className="upload-icon" />
                    )}
                    <p>{uploading ? "Uploading..." : "Click to upload"}</p>
                  </div>
                )}
                {uploadedImages.length > 0 && (
                  <div className="upload-preview">
                    {uploadedImages.map((url, i) => (
                      <div key={i} className="upload-thumb">
                        <img src={url} alt={`Upload ${i + 1}`} />
                        <button
                          className="remove-btn"
                          onClick={() => removeImage(i)}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* == STYLE TAB (Themes + Patterns) == */}
          {activeTab === "style" && (
            <div className="sidebar-tab-content">
              <div className="sidebar-section">
                <h3>{t("editor.themes")}</h3>
                <div className="theme-grid">
                  {THEMES.map((th) => (
                    <button
                      key={th.id}
                      className={`theme-option ${th.className} ${theme === th.id ? "active" : ""}`}
                      onClick={() => setTheme(th.id)}
                      title={th.name}
                    >
                      <span className="theme-label">{th.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="sidebar-section">
                <h3>Background Pattern</h3>
                <div className="pattern-grid">
                  {BG_PATTERNS.map((p) => (
                    <button
                      key={p.id}
                      className={`pattern-btn ${bgPattern === p.id ? "pattern-btn-active" : ""}`}
                      onClick={() => setBgPattern(p.id)}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* == SELECTED ELEMENT EDITOR == */}
          <AnimatePresence>
            {selectedEl && (
              <motion.div
                className="element-editor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="element-editor-header">
                  <h4>
                    Edit{" "}
                    {selectedEl.type === "sticker"
                      ? "Sticker"
                      : selectedEl.type === "text"
                        ? "Text"
                        : "Image"}
                  </h4>
                  <div className="element-quick-actions">
                    <button
                      onClick={() => duplicateElement(selectedEl.id)}
                      title="Duplicate"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      onClick={() => bringToFront(selectedEl.id)}
                      title="Bring to front"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      onClick={() => sendToBack(selectedEl.id)}
                      title="Send to back"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      onClick={() => deleteElement(selectedEl.id)}
                      title="Delete"
                      className="delete-action"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Text-specific controls */}
                {selectedEl.type === "text" && (
                  <>
                    <div className="editor-field">
                      <label>Content</label>
                      <input
                        type="text"
                        value={selectedEl.content}
                        onChange={(e) =>
                          updateElement(selectedEl.id, {
                            content: e.target.value,
                          })
                        }
                        className="editor-input"
                      />
                    </div>
                    <div className="editor-field">
                      <label>Font</label>
                      <select
                        value={selectedEl.fontFamily || "dancing"}
                        onChange={(e) =>
                          updateElement(selectedEl.id, {
                            fontFamily: e.target.value,
                          })
                        }
                        className="editor-select"
                      >
                        {FONT_OPTIONS.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="editor-row">
                      <div className="editor-field" style={{ flex: 1 }}>
                        <label>Size ({selectedEl.fontSize || 22}px)</label>
                        <input
                          type="range"
                          min="10"
                          max="72"
                          value={selectedEl.fontSize || 22}
                          onChange={(e) =>
                            updateElement(selectedEl.id, {
                              fontSize: parseInt(e.target.value),
                            })
                          }
                          className="editor-range"
                        />
                      </div>
                      <div className="editor-field" style={{ width: 50 }}>
                        <label>Color</label>
                        <input
                          type="color"
                          value={selectedEl.fontColor || "#e8477e"}
                          onChange={(e) =>
                            updateElement(selectedEl.id, {
                              fontColor: e.target.value,
                            })
                          }
                          className="mini-color"
                        />
                      </div>
                    </div>
                    {/* Text styling buttons */}
                    <div className="text-style-row">
                      <button
                        className={`style-btn ${selectedEl.fontWeight === 700 ? "style-btn-active" : ""}`}
                        onClick={() =>
                          updateElement(selectedEl.id, {
                            fontWeight:
                              selectedEl.fontWeight === 700 ? 400 : 700,
                          })
                        }
                      >
                        <Bold size={14} />
                      </button>
                      <button
                        className={`style-btn ${selectedEl.fontStyle === "italic" ? "style-btn-active" : ""}`}
                        onClick={() =>
                          updateElement(selectedEl.id, {
                            fontStyle:
                              selectedEl.fontStyle === "italic"
                                ? "normal"
                                : "italic",
                          })
                        }
                      >
                        <Italic size={14} />
                      </button>
                      <span className="style-divider" />
                      <button
                        className={`style-btn ${selectedEl.textAlign === "left" ? "style-btn-active" : ""}`}
                        onClick={() =>
                          updateElement(selectedEl.id, { textAlign: "left" })
                        }
                      >
                        <AlignLeft size={14} />
                      </button>
                      <button
                        className={`style-btn ${(selectedEl.textAlign || "center") === "center" ? "style-btn-active" : ""}`}
                        onClick={() =>
                          updateElement(selectedEl.id, { textAlign: "center" })
                        }
                      >
                        <AlignCenter size={14} />
                      </button>
                      <button
                        className={`style-btn ${selectedEl.textAlign === "right" ? "style-btn-active" : ""}`}
                        onClick={() =>
                          updateElement(selectedEl.id, { textAlign: "right" })
                        }
                      >
                        <AlignRight size={14} />
                      </button>
                    </div>
                  </>
                )}

                {/* Sticker controls */}
                {selectedEl.type === "sticker" && (
                  <>
                    <div className="editor-row">
                      <div className="editor-field" style={{ flex: 1 }}>
                        <label>Size ({selectedEl.fontSize || 48}px)</label>
                        <input
                          type="range"
                          min="20"
                          max="140"
                          value={selectedEl.fontSize || 48}
                          onChange={(e) =>
                            updateElement(selectedEl.id, {
                              fontSize: parseInt(e.target.value),
                            })
                          }
                          className="editor-range"
                        />
                      </div>
                      <div className="editor-field" style={{ width: 50 }}>
                        <label>Color</label>
                        <input
                          type="color"
                          value={selectedEl.stickerColor || "#e8477e"}
                          onChange={(e) =>
                            updateElement(selectedEl.id, {
                              stickerColor: e.target.value,
                            })
                          }
                          className="mini-color"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Common controls for ALL elements */}
                <div className="editor-row">
                  <div className="editor-field" style={{ flex: 1 }}>
                    <label>
                      <RotateCw size={12} /> Rotation (
                      {selectedEl.rotation || 0}°)
                    </label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={selectedEl.rotation || 0}
                      onChange={(e) =>
                        updateElement(selectedEl.id, {
                          rotation: parseInt(e.target.value),
                        })
                      }
                      className="editor-range"
                    />
                  </div>
                </div>
                <div className="editor-row">
                  <div className="editor-field" style={{ flex: 1 }}>
                    <label>
                      Opacity ({Math.round((selectedEl.opacity ?? 1) * 100)}%)
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={Math.round((selectedEl.opacity ?? 1) * 100)}
                      onChange={(e) =>
                        updateElement(selectedEl.id, {
                          opacity: parseInt(e.target.value) / 100,
                        })
                      }
                      className="editor-range"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>

        {/* Canvas & Share */}
        <div className="editor-canvas-wrapper">
          <motion.div
            className="canvas-container"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div
              ref={canvasRef}
              className={`card-canvas card-theme-${theme} ${bgPattern !== "none" ? `bg-pattern-${bgPattern}` : ""}`}
              onClick={() => setSelectedElement(null)}
            >
              {/* Elements */}
              {elements.map((el) => (
                <div
                  key={el.id}
                  className={`card-element ${selectedElement === el.id ? "selected" : ""}`}
                  style={{
                    left: `${el.x}%`,
                    top: `${el.y}%`,
                    zIndex: dragging === el.id ? 999 : el.zIndex || 2,
                    transform: `rotate(${el.rotation || 0}deg)`,
                    opacity: el.opacity ?? 1,
                    touchAction: "none",
                  }}
                  onMouseDown={(e) => handleMouseDown(e, el.id)}
                  onTouchStart={(e) => handleTouchStart(e, el.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedElement(el.id);
                  }}
                >
                  <div className="element-controls">
                    <button
                      className="element-control-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateElement(el.id);
                      }}
                      title="Duplicate"
                    >
                      <Copy size={12} />
                    </button>
                    <button
                      className="element-control-btn element-control-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteElement(el.id);
                      }}
                      title="Delete"
                    >
                      <X size={12} />
                    </button>
                  </div>

                  {el.type === "sticker" && (
                    <div className="card-svg-element">
                      <StickerRenderer
                        stickerId={el.content}
                        size={el.fontSize || 48}
                        color={el.stickerColor}
                      />
                    </div>
                  )}

                  {el.type === "text" && (
                    <div
                      className="card-text-element"
                      style={{
                        fontSize: `${el.fontSize || 22}px`,
                        color: el.fontColor || "#e8477e",
                        fontWeight: el.fontWeight || 600,
                        fontStyle: el.fontStyle || "normal",
                        fontFamily: getFontCss(el.fontFamily),
                        textAlign:
                          (el.textAlign as "left" | "center" | "right") ||
                          "center",
                        whiteSpace: "nowrap",
                        background: "rgba(255,255,255,0.45)",
                        padding: "4px 10px",
                        borderRadius: "8px",
                      }}
                    >
                      {el.content}
                    </div>
                  )}

                  {el.type === "image" && (
                    <div className="card-image-element">
                      <img
                        src={el.content}
                        alt="Custom"
                        style={{ maxWidth: 120, borderRadius: 8 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Main message - Below card */}
            {mainMessage && (
              <div
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                  width: "100%",
                  zIndex: 10,
                }}
              >
                <p
                  style={{
                    fontFamily: getFontCss(mainMessageFont),
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    color: mainMessageColor,
                    lineHeight: 1.5,
                    wordBreak: "break-word",
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(4px)",
                    padding: "10px 18px",
                    borderRadius: "14px",
                    border: `1px solid ${mainMessageColor}22`,
                    display: "inline-block",
                  }}
                >
                  {mainMessage}
                </p>
              </div>
            )}
          </motion.div>

          {/* Generate */}
          <div className="generate-section">
            <motion.button
              className="generate-btn"
              onClick={handleGenerate}
              disabled={generating}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {generating ? (
                <>
                  <Loader2
                    size={18}
                    style={{ animation: "spin 1s linear infinite" }}
                  />{" "}
                  {t("editor.generating")}
                </>
              ) : (
                <>{t("editor.generateLink")}</>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
