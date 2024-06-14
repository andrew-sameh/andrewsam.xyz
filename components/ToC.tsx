'use client'
import { useEffect, useRef, type MouseEvent } from 'react'
import type { TOC } from '@/types/server'

export function ToC({ toc }: { toc: TOC[] }) {
  const modifiedToc = toc.map((item) => {
    let parts = item.url.split('-');
    let lastPart = parts[parts.length - 1];
    if (!isNaN(Number(lastPart))) {
      // If the last part is a number, remove it
      parts.pop();
    }
    return {
      ...item,
      url: parts.join('-'),
    }
  })
  let navRef = useRef<HTMLDivElement>(null)
  let activeIdRef = useRef(null)

  useEffect(() => {
    let observerOptions = {
      rootMargin: '-10px 0px 0px 0px',
      threshold: 0,
    }
    let observer = new IntersectionObserver((entries) => {
      let firstActiveId: string | null = null
      entries.forEach((entry) => {
        let firstElement = document.querySelector(`#${firstActiveId}`)

        if (entry.intersectionRatio > 0) {
          if (
            !firstActiveId ||
            (firstElement &&
              entry.target.getBoundingClientRect().top < firstElement.getBoundingClientRect().top)
          ) {
            firstActiveId = entry.target.getAttribute('id')
          }
        }
      })

      if (firstActiveId && activeIdRef.current !== firstActiveId) {
        if (activeIdRef.current && navRef.current) {
          let previousActiveAnchor = navRef.current.querySelector(
            `li a[href="#${activeIdRef.current}"]`
          )
          if (previousActiveAnchor) {
            previousActiveAnchor.classList.remove('text-gray-600')
          }
        }

        if (navRef.current) {
          let currentActiveAnchor = navRef.current.querySelector(`li a[href="#${firstActiveId}"]`)
          if (currentActiveAnchor) {
            currentActiveAnchor.classList.add('text-gray-600')
          }
        }

        activeIdRef.current = firstActiveId
      }
    }, observerOptions)

    // Track only the headers that are in the ToC
    modifiedToc.forEach((item) => {
      let header = document.querySelector(item.url)
      if (header) {
        observer.observe(header)
      }
    })

    // Cleanup the observer when the component is unmounted
    return () => observer.disconnect()
  }, [modifiedToc])

  let handleLinkClick = (e: MouseEvent, url: string) => {
    console.log('URL:', url); // Log the URL

    let targetElement: HTMLElement | null = document.querySelector(url)
    console.log('Target Element:', targetElement); // Log the target element

    if (targetElement) {
      e.preventDefault()
      console.log('Offset Top:', targetElement.offsetTop); // Log the offsetTop value

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav ref={navRef} className="top-24 self-start pl-0 md:sticky">
      <ul className="list-none space-y-1.5">
        {modifiedToc.map((item, index) => 
        (
        
          <li key={index}>
            <a
              href={item.url}
              onClick={(e) => handleLinkClick(e, item.url)}
              className="block text-gray-400 transition duration-150 ease-in-out hover:text-gray-600"
            >
              {item.value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
