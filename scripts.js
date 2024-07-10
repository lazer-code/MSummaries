document.addEventListener('DOMContentLoaded', () => {
    fetch('Menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-container').innerHTML = data;
            const menu = document.querySelector('.menu');
            const toggle = document.getElementById('menu-toggle');
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('open');
                menu.classList.toggle('open');
                document.getElementById('menu-container').style.display = menu.classList.contains('open') ? 'block' : 'none';
            });
  
            const expandables = document.querySelectorAll('.expandable');
            expandables.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const parentLi = item.parentElement;
  
                    // Check if it's a top-level menu item (like "התנועה הציונית")
                    if (parentLi.parentElement === menu.querySelector('ul')) {
                        // Close all other top-level items
                        const topLevelItems = menu.querySelectorAll('li');
                        topLevelItems.forEach(topItem => {
                            if (topItem !== parentLi) {
                                topItem.classList.remove('open');
                                closeChildren(topItem);
                            }
                        });
                    }
  
                    // Close all sibling lists and their children
                    const siblingLis = parentLi.parentElement.children;
                    Array.from(siblingLis).forEach(sibling => {
                        if (sibling !== parentLi) {
                            sibling.classList.remove('open');
                            closeChildren(sibling);
                        }
                    });
  
                    parentLi.classList.toggle('open');
  
                    // Add or remove class to highlight innermost open submenu items
                    if (parentLi.classList.contains('open')) {
                        const openChildren = parentLi.querySelectorAll('.open');
                        openChildren.forEach(child => child.classList.remove('inner-open'));
                        item.closest('li').querySelectorAll('.expandable').forEach(item => item.classList.add('inner-open'));
                    } else {
                        parentLi.querySelectorAll('.expandable').forEach(item => item.classList.remove('inner-open'));
                    }
                });
            });
  
            function closeChildren(element) {
                const openChildren = element.querySelectorAll('.open');
                openChildren.forEach(child => child.classList.remove('open', 'inner-open'));
            }
        });
  });
  