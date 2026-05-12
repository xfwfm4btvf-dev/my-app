"use client";
import { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";

export default function ThemeToggle() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("mui-mode") as "light" | "dark" | null;
    if (saved) setMode(saved);
  }, []);

  const toggle = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    if ((window as any).__setMuiMode) {
      (window as any).__setMuiMode(newMode);
    }
  };

  return (
    <Tooltip title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton onClick={toggle} color="inherit" size="small" aria-label="toggle theme">
        {mode === "dark" ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}
